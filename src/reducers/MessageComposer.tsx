import * as actions from './../actions/Actions';
import { MessageComposerProps } from '../components/MessageComposer';

export function messageComposer(state: MessageComposerProps, action: actions.Action): MessageComposerProps {
  switch (action.type) {
    case actions.TypeKeys.SEND_MESSAGE_STARTED:
        return { ...state, isEnabled: false };
    case actions.TypeKeys.SEND_MESSAGE_FAILED:
        return { ...state, isEnabled: true  };
    case actions.TypeKeys.SEND_MESSAGE_COMPLETED:
        return { ...state, isEnabled: true, message: '' };
    case actions.TypeKeys.SELECTED_CHANNEL_CHANGED:
        return { ...state, isEnabled: (action.selectedChannel !== undefined) };
    case actions.TypeKeys.MESSAGE_CHANGED:
        return { ...state, message: action.message };
    default:
        return { ...state };
  }
}