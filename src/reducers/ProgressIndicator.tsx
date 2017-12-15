import { ProgressIndicatorProps } from './../components/ProgressIndicator';
import * as actions from './../actions/Actions';

export function progressIndicator(state: ProgressIndicatorProps, action: actions.Action): ProgressIndicatorProps {
    switch (action.type) {
        case actions.TypeKeys.LOG_IN_STARTED:
        case actions.TypeKeys.GET_USER_STARTED:
        case actions.TypeKeys.SAVE_USER_STARTED:
        case actions.TypeKeys.CREATE_NEW_CHANNEL_STARTED:
        case actions.TypeKeys.GET_ALL_CHANNELS_STARTED:
        case actions.TypeKeys.DELETE_CHANNEL_STARTED:
        case actions.TypeKeys.DELETE_MESSAGE_STARTED:
        case actions.TypeKeys.RENAME_CHANNEL_STARTED:
        case actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_STARTED:
            return { ...state, isActive: true };
        case actions.TypeKeys.LOG_IN_COMPLETED:
        case actions.TypeKeys.LOG_IN_FAILED:  
        case actions.TypeKeys.GET_USER_COMPLETED:
        case actions.TypeKeys.GET_USER_FAILED:   
        case actions.TypeKeys.SAVE_USER_COMPLETED:
        case actions.TypeKeys.SAVE_USER_FAILED: 
        case actions.TypeKeys.CREATE_NEW_CHANNEL_COMPLETED:
        case actions.TypeKeys.CREATE_NEW_CHANNEL_FAILED:  
        case actions.TypeKeys.GET_ALL_CHANNELS_COMPLETED:
        case actions.TypeKeys.GET_ALL_CHANNELS_FAILED:
        case actions.TypeKeys.DELETE_CHANNEL_COMPLETED:
        case actions.TypeKeys.DELETE_CHANNEL_FAILED:
        case actions.TypeKeys.DELETE_MESSAGE_COMPLETED:
        case actions.TypeKeys.DELETE_MESSAGE_FAILED:
        case actions.TypeKeys.RENAME_CHANNEL_COMPLETED:
        case actions.TypeKeys.RENAME_CHANNEL_FAILED:
        case actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_COMPLETED:
        case actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_FAILED:
            return { ...state, isActive: false };  
        default:
            return { ...state };
    }
}