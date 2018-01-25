import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Conversation, { ConversationProps, ConversationDispatch } from '../components/Conversation';
import * as actions from './../actions/Conversation';
import Channel from '../models/Channel';
import Message from '../models/Message';

export function mapStateToProps({ conversation, profile }: StoreState): ConversationProps {
  return {
    isConversationDataLoaded: conversation.isConversationDataLoaded,
    channel: conversation.channel,
    messages: conversation.messages,
    members: conversation.members,  
    currentUserId: profile.email,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): ConversationDispatch {
  return {
    onGetMessages: async (channelId: string) => await dispatch(actions.onGetMessages(channelId)),
    onRenameChannel: async (channel: Channel) => await dispatch(actions.onRenameChannel(channel)),
    onInviteMemberToChannel: async (channel: Channel) => await dispatch(actions.onInviteMemberToChannel(channel)),
    onDeleteChannel: async (channelId: string) => await dispatch(actions.onDeleteChannel(channelId)),
    onVoteMessage: async (channelId: string, message: Message, userId: string, isPositive: boolean) => 
    await dispatch(actions.onVoteMessage(channelId, message, userId, isPositive)),
    onDeleteMessage: async (channelId: string, messageId: string) => await dispatch(actions.onDeleteMessage(channelId, messageId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);