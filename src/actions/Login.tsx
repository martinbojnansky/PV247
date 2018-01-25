import * as actions from './Actions';
import { push } from 'connected-react-router';
import * as routes from './../constants/Routes';
import { authorize } from './../api/Authorization';
import { Keys as localStorageKeys } from './../constants/LocalStorageConstants';
import { onShowError } from './Error';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';
import { Dispatch, ActionCreator } from 'react-redux';
import { parse } from '../api/Response';

export function onLogInStarted(): actions.LogInStartedAction {
    return {
        type: actions.TypeKeys.LOG_IN_STARTED
    };
}

export function onLogInFailed(): actions.LogInFailedAction {
    return {
        type: actions.TypeKeys.LOG_IN_FAILED
    };
}

export function onLogInCompleted(email: string): actions.LogInCompletedAction {
    return {
        type: actions.TypeKeys.LOG_IN_COMPLETED,
        email: email
    };
}

export const onLogIn: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (email: string) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => {
        if(email === '') {
            dispatch(onShowError('Ooops!', `Email address cannot be empty.`));
            return dispatch(onLogInFailed());
        }

        dispatch(onLogInStarted());

        try {
            let token = await parse<string>(authorize(email));
            
            localStorage.setItem(localStorageKeys.USER_ID, email);
            localStorage.setItem(localStorageKeys.TOKEN, token);

            dispatch(push(routes.Routes.DEFAULT, getState()));
            return dispatch(onLogInCompleted(email));
        } catch(error) {
            dispatch(onShowError('Ooops!', `User with email address ${email} doesn't exists`));
            return dispatch(onLogInFailed());
        }
    }
};