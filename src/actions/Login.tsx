import * as actions from './Actions';
import { store } from './../models/Store';
import { push } from 'connected-react-router';
import * as routes from './../constants/Routes';
import { authorize } from './../api/Authorization';
import { Keys as localStorageKeys } from './../constants/LocalStorageConstants';
import { onShowError } from './Error';

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

export const onLogIn = (email: string): actions.LogInAction => {
    store.dispatch(onLogInStarted());
  
    authorize(email)
    .then((token: string) => {
        localStorage.setItem(localStorageKeys.USER_ID, email);
        localStorage.setItem(localStorageKeys.TOKEN, token);
        store.dispatch(onLogInCompleted(email));
        store.dispatch(push(routes.Routes.DEFAULT, store.getState()));
    }).catch((error: Error) => {
        store.dispatch(onShowError('Ooops!', `User with email address ${email} doesn't exists`));
        store.dispatch(onLogInFailed());
    });

    return {
        type: actions.TypeKeys.LOG_IN
    };
};