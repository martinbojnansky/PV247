import * as actions from './Actions';
import { push } from 'connected-react-router';
import * as routes from './../constants/Routes';
import { Keys as localStorageKeys } from './../constants/LocalStorageConstants';
import { ActionCreator, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';

export const logOut: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= () => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => { 
        localStorage.setItem(localStorageKeys.TOKEN, '');
        dispatch(push(routes.Routes.LOG_IN));
    
        return dispatch({
            type: actions.TypeKeys.LOG_OUT
        } as actions.Action);
    }
};