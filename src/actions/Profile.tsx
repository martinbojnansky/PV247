import * as actions from './Actions';
import { store } from './../models/Store';
import { User, UserCustomData } from './../models/User';
import { getUser, getUserPicture, saveUser, saveUserPicture } from './../api/User';
import { push } from 'connected-react-router';
import { Routes } from '../constants/Routes';
import { BlobFile } from '../models/BlobFile';
import { onShowError } from './Error';

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

export const onGetUser = (email: string): actions.GetUserAction => {
    store.dispatch(onGetUserStarted());

    getUser(email)
    .then((user: User) => {
        onUserRecieved(user);
    })
    .catch((error: Error) => {
        store.dispatch(
            onShowError('Ooops!', 'Unable to retrieve user information. Check your network connection and try again.'));
        store.dispatch(onGetUserFailed());
    });

    return {
        type: actions.TypeKeys.GET_USER
    };
};

function onUserRecieved(user: User) {
    let userCustomData: UserCustomData = JSON.parse(user.customData);
    
    getUserPicture(userCustomData.pictureId)
    .then((pictureUrl: string) => {
        store.dispatch(onGetUserCompleted(userCustomData, pictureUrl));
    })
    .catch((error: Error) => {
        store.dispatch(onGetUserCompleted(userCustomData, ''));
    });   
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

const getUserDisplayName = (name: string) => {
    if (name !== '') {
        return name;
    } else {
        return store.getState().profile.userCustomData.displayName;
    }
};

const getUserPictureId = (id: string) => {
    if (id !== '') {
        return id;
    } else {
        return store.getState().profile.userCustomData.pictureId;
    }
};

export const onSaveUser = (email: string, displayName: string, pictureFile?: File): 
actions.SaveUserAction => {
    store.dispatch(onSaveUserStarted());
    
    if (pictureFile) {
        saveUserPicture(pictureFile)
        .then((blobFile: BlobFile[]) => {
            onSavingUser(email, displayName, blobFile[0].id);
        })
        .catch((error: Error) => {
            store.dispatch(
                onShowError('Ooops!', 'Could not upload picture. Check your network connection and try again.'));
         });
    } else {
        onSavingUser(email, displayName);
    }

    return {
        type: actions.TypeKeys.SAVE_USER
    };
};

function onSavingUser(email: string, displayName: string, pictureId: string = '') {
    let newUser: UserCustomData = { 
        displayName: getUserDisplayName(displayName), 
        pictureId: getUserPictureId(pictureId)
    };

    saveUser(email, newUser)
    .then((user: User) => {
        let userCustomData: UserCustomData = JSON.parse(user.customData);
        store.dispatch(onSaveUserCompleted(email, userCustomData));
        store.dispatch(push(Routes.CHANNELS));
    })
    .catch((error: Error) => {
        store.dispatch(onSaveUserFailed());
        store.dispatch(onShowError('Ooops!', 'Could not update user. Check your network connection and try again.'));
    });
}

export function onCancelUser(): actions.CancelUserAction {
    store.dispatch(push(Routes.CHANNELS));

    return {
        type: actions.TypeKeys.CANCEL_USER
    };
}