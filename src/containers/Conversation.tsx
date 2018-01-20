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
    onGetMessages: (channelId: string) => dispatch(actions.onGetMessages(channelId)),
    onRenameChannel: (channel: Channel) => dispatch(actions.onRenameChannel(channel)),
    onInviteMemberToChannel: (channel: Channel) => dispatch(actions.onInviteMemberToChannel(channel)),
    onDeleteChannel: (channelId: string) => dispatch(actions.onDeleteChannel(channelId)),
    onVoteMessage: (channelId: string, message: Message, userId: string, isPositive: boolean) => 
      dispatch(actions.onVoteMessage(channelId, message, userId, isPositive)),
    onDeleteMessage: (channelId: string, messageId: string) => dispatch(actions.onDeleteMessage(channelId, messageId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);