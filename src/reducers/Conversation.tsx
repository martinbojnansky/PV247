import * as actions from './../actions/Actions';
import { ConversationProps } from '../components/Conversation';

export function conversation(state: ConversationProps, action: actions.Action): ConversationProps {
  switch (action.type) {
    case actions.TypeKeys.GET_CHANNEL_MEMBERS_STARTED:
      return { ...state, members: {} };
    case actions.TypeKeys.CHANNEL_MEMBER_RECIEVED:
      return { ...state, members: action.members };
    case actions.TypeKeys.SELECTED_CHANNEL_CHANGED:
      return { ...state, channel: action.selectedChannel };
    case actions.TypeKeys.GET_MESSAGES_STARTED:
      return { ...state, isConversationDataLoaded: false };
    case actions.TypeKeys.GET_MESSAGES_FAILED:
      return { ...state, isConversationDataLoaded: true };
    case actions.TypeKeys.GET_MESSAGES_COMPLETED:
      return { ...state, messages: action.messages, isConversationDataLoaded: true };
    case actions.TypeKeys.LOG_OUT:
      return { ...state, channel: undefined };
    default:
      return { ...state };
  }
}