import * as actions from './Actions';
import { sendMessage } from '../api/Messages';
import { NewMessageDTO } from '../models/Message';
import { onShowError } from './Error';
import { onGetMessages } from './Conversation';
import { ActionCreator, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';

export function onMessageChanged(message: string): actions.MessageChangedAction {
    return {
        type: actions.TypeKeys.MESSAGE_CHANGED,
        message: message
    };
}

export function onSendMessageStarted(): actions.SendMessageStartedAction {
    return {
        type: actions.TypeKeys.SEND_MESSAGE_STARTED
    };
}

export function onSendMessageFailed(): actions.SendMessageFailedAction {
    return {
        type: actions.TypeKeys.SEND_MESSAGE_FAILED
    };
}

export function onSendMessageCompleted(message: string): actions.SendMessageCompletedAction {
    return {
        type: actions.TypeKeys.SEND_MESSAGE_COMPLETED,
        message: message
    };
}

export const onSendMessage: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (message: string) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => {
        dispatch(onSendMessageStarted());

        let channel = getState().conversation.channel;
        let channelId = channel ? channel.id : '';
        let newMessage: NewMessageDTO = {
            value: message, 
            customData: JSON.stringify({ upVotes: [], downVotes: [] })
        };

        try {
            await sendMessage(channelId, newMessage);
            dispatch(onSendMessageCompleted(message));
            return dispatch(onGetMessages(channelId));
        }
        catch(error) {
            dispatch(
                onShowError('Ooops!', `Unable to send message. Check your network connection and try again.`));
            return dispatch(onSendMessageFailed());
        };
    }
}