import * as actions from './Actions';
import { User, UserCustomData } from './../models/User';
import { getUser, getUserPicture, saveUser, saveUserPicture } from './../api/User';
import { push } from 'connected-react-router';
import { Routes } from '../constants/Routes';
import { BlobFile } from '../models/BlobFile';
import { onShowError } from './Error';
import { parse } from '../api/Response';
import { ActionCreator, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';

export function onUserDisplayNameChanged(displayName: string): actions.UserDisplayNameChangedAction {
    return {
        type: actions.TypeKeys.USER_DISPLAY_NAME_CHANGED,
        displayName: displayName
    };
}

export function onUserPictureChanged(picturePath: string): actions.UserPictureChangedAction {
    return {
        type: actions.TypeKeys.USER_PICTURE_CHANGED,
        picturePath: picturePath
    };
}

export function onGetUserStarted(): actions.GetUserStartedAction {
    return {
        type: actions.TypeKeys.GET_USER_STARTED
    };
}

export function onGetUserFailed(): actions.GetUserFailedAction {
    return {
        type: actions.TypeKeys.GET_USER_FAILED
    };
}

export function onGetUserCompleted(userCustomData: UserCustomData, pictureUrl: string): actions.GetUserCompletedAction {
    return {
        type: actions.TypeKeys.GET_USER_COMPLETED,
        userCustomData: userCustomData,
        pictureUrl: pictureUrl
    };
}


export const onGetUser: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (email: string) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => { 
        dispatch(onGetUserStarted());

        try {
            let user = await parse<User>(getUser(email));
            return dispatch(onUserRecieved(user));
        }
        catch(error) {
            dispatch(
                onShowError('Ooops!', 'Unable to retrieve user information. Check your network connection and try again.'));
            return dispatch(onGetUserFailed());
        };
    }
};

export const onUserRecieved: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (user: User) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => { 
        let userCustomData: UserCustomData = JSON.parse(user.customData);
        
        try {
            let pictureUrl = await parse<string>(getUserPicture(userCustomData.pictureId));
            return dispatch(onGetUserCompleted(userCustomData, pictureUrl));
        }
        catch(error) {
            return dispatch(onGetUserCompleted(userCustomData, ''));
        };
    }   
}

export function onSaveUserStarted(): actions.SaveUserStartedAction {
    return {
        type: actions.TypeKeys.SAVE_USER_STARTED
    };
}

export function onSaveUserFailed(): actions.SaveUserFailedAction {
    return {
        type: actions.TypeKeys.SAVE_USER_FAILED
    };
}

export function onSaveUserCompleted(email: string, userCustomData: UserCustomData): actions.SaveUserCompletedAction {
    return {
        type: actions.TypeKeys.SAVE_USER_COMPLETED,
        email: email,
        userCustomData: userCustomData
    };
}

const getUserDisplayName = (getState: () => StoreState, name: string) => {
    if (name !== '') {
        return name;
    } else {
        return getState().profile.userCustomData.displayName;
    }
};

const getUserPictureId = (getState: () => StoreState, id: string) => {
    if (id !== '') {
        return id;
    } else {
        return getState().profile.userCustomData.pictureId;
    }
};

export const onSaveUser: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (email: string, displayName: string, pictureFile?: File) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => { 
        dispatch(onSaveUserStarted());
        
        if (pictureFile) {
            try {
                let blobFile = await parse<BlobFile[]>(saveUserPicture(pictureFile));
                return dispatch(onSavingUser(email, displayName, blobFile[0].id));
            }
            catch(error) {
                return dispatch(
                    onShowError('Ooops!', 'Could not upload picture. Check your network connection and try again.'));
            }
        } else {
            return dispatch(onSavingUser(email, displayName));
        }
    }
};

export const onSavingUser: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (email: string, displayName: string, pictureId: string = '') => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => { 
        let newUser: UserCustomData = { 
            displayName: getUserDisplayName(getState, displayName), 
            pictureId: getUserPictureId(getState, pictureId)
        };

        try {
            let user = await parse<User>(saveUser(email, newUser));
            let userCustomData: UserCustomData = JSON.parse(user.customData);
            dispatch(push(Routes.CHANNELS));
            return dispatch(onSaveUserCompleted(email, userCustomData));    
        }
        catch(error) {
            dispatch(onShowError('Ooops!', 'Could not update user. Check your network connection and try again.'));
            return dispatch(onSaveUserFailed());
        };
    }
}

export const onCancelUser: ActionCreator<ThunkAction<actions.Action, StoreState, void>> 
= () => {
    return (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): actions.Action => { 
        dispatch(push(Routes.CHANNELS));

        return {
            type: actions.TypeKeys.CANCEL_USER
        };
    }
}