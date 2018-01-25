import * as actions from './Actions';
import { deleteChannel, replaceChannel } from '../api/Channels';
import { getMessages, deleteMessage, updateMessage } from '../api/Messages';
import { store } from '../models/Store';
import { onShowError } from './Error';
import { onGetAllChannels } from './Channels';
import Message, { MessageDTO } from '../models/Message';
import Channel, { ChannelDTO } from '../models/Channel';
import { getUser, getUserPicture } from '../api/User';
import { User, UserCustomData } from '../models/User';
import { Member } from '../models/Member';
import { parse } from '../api/Response';
import { ActionCreator } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';
import { Dispatch } from 'redux';

export function onDeleteChannelStarted(): actions.DeleteChannelStartedAction {
    return {
        type: actions.TypeKeys.DELETE_CHANNEL_STARTED
    };
}

export function onDeleteChannelFailed(): actions.DeleteChannelFailedAction {
    return {
        type: actions.TypeKeys.DELETE_CHANNEL_FAILED
    };
}

export function onDeleteChannelCompleted(): actions.DeleteChannelCompletedAction {
    return {
        type: actions.TypeKeys.DELETE_CHANNEL_COMPLETED
    };
}

export const onDeleteChannel = (channelId: string): actions.DeleteChannelAction => {    
    if (confirm('Do you really want to delete channel?')) {
        store.dispatch(onDeleteChannelStarted());
        deleteChannel(channelId)
        .then(() => {
            store.dispatch(onDeleteChannelCompleted());
            store.dispatch(onGetAllChannels());
        })
        .catch((error: Error) => {
            store.dispatch(onDeleteChannelFailed());
            store.dispatch(
                onShowError('Ooops!', 'Could not delete channel. Check your network connection and try again.'));
        });
    }
    
    return {
        type: actions.TypeKeys.DELETE_CHANNEL
    };
};

export function onGetMessagesStarted(): actions.GetMessagesStartedAction {
    return {
        type: actions.TypeKeys.GET_MESSAGES_STARTED
    };
}

export function onGetMessagesFailed(): actions.GetMessagesFailedAction {
    return {
        type: actions.TypeKeys.GET_MESSAGES_FAILED
    };
}

export function onGetMessagesCompleted(messages: Message[]): actions.GetMessagesCompletedAction {
    return {
        type: actions.TypeKeys.GET_MESSAGES_COMPLETED,
        messages: messages
    };
}

export const onGetMessages: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= (channelId: string, scrollToEnd: boolean = true, showErrors: boolean = true) => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => {
        dispatch(onGetMessagesStarted());

        try {
            let messageDTOs = await parse<MessageDTO[]>(getMessages(channelId));
            let messages: Message[] = parseMessages(messageDTOs);
            
            scrollToNewestMessage(scrollToEnd); 
            return dispatch(onGetMessagesCompleted(messages));
        }
        catch(error) {
            if (showErrors) {
                dispatch(onShowError('Ooops!', 'Unable to get messages. Check your network connection and try again.'));
                return dispatch(onGetMessagesFailed());
            }
        }

        return dispatch(onGetMessagesCompleted([]));
    }
};

function parseMessages(dtos: MessageDTO[]): Message[] {
    return dtos.map(function(dto: MessageDTO) {
        let message: Message = {
            id: dto.id,
            value: dto.value,
            createdAt: dto.createdAt,
            createdBy: dto.createdBy,
            updatedAt: dto.updatedAt,
            updatedBy: dto.updatedBy,
            customData: JSON.parse(dto.customData)
        };
        return message;
    });
}

function scrollToNewestMessage(scroll: boolean) {
    try {
        let scrollbar = document.getElementById('conversation-detail');
        if (scroll && scrollbar) {
            scrollbar.scrollTo(scrollbar.scrollLeft, scrollbar.scrollHeight);
        }
    } catch {
        // Ignore error
    }
}

export function onDeleteMessageStarted(): actions.DeleteMessageStartedAction {
    return {
        type: actions.TypeKeys.DELETE_MESSAGE_STARTED
    };
}

export function onDeleteMessageFailed(): actions.DeleteMessageFailedAction {
    return {
        type: actions.TypeKeys.DELETE_MESSAGE_FAILED
    };
}

export function onDeleteMessageCompleted(): actions.DeleteMessageCompletedAction {
    return {
        type: actions.TypeKeys.DELETE_MESSAGE_COMPLETED
    };
}

export const onDeleteMessage = (channelId: string, messageId: string): actions.DeleteMessageAction => {
    if (confirm('Do you really want to delete message?')) {
        store.dispatch(onDeleteMessageStarted());        
        deleteMessage(channelId, messageId)
        .then(() => {
            store.dispatch(onDeleteMessageCompleted());
            store.dispatch(onGetMessages(channelId, false));
        })
        .catch((error: Error) => {
            store.dispatch(onDeleteMessageFailed());
            store.dispatch(
                onShowError('Ooops!', 'Could not delete message. Check your network connection and try again.'));
        });
    }
    
    return {
        type: actions.TypeKeys.DELETE_MESSAGE
    };
};

export function onRenameChannelStarted(): actions.RenameChannelStartedAction {
    return {
        type: actions.TypeKeys.RENAME_CHANNEL_STARTED
    };
}

export function onRenameChannelFailed(): actions.RenameChannelFailedAction {
    return {
        type: actions.TypeKeys.RENAME_CHANNEL_FAILED
    };
}

export function onRenameChannelCompleted(): actions.RenameChannelCompletedAction {
    return {
        type: actions.TypeKeys.RENAME_CHANNEL_COMPLETED
    };
}

export const onRenameChannel = (channel: Channel): actions.RenameChannelAction => {    
    let name = prompt('Enter new channel name', channel.name);    
    if (name) {
        store.dispatch(onRenameChannelStarted());  

        let updatedChannel: ChannelDTO = {
            id: channel.id,
            name: name,
            customData: JSON.stringify(channel.customData)
        };

        replaceChannel(updatedChannel)
        .then(() => {
            store.dispatch(onRenameChannelCompleted());
            store.dispatch(onGetAllChannels());
        })
        .catch((error: Error) => {
            store.dispatch(onRenameChannelFailed());
            store.dispatch(
                onShowError('Ooops!', 'Could not rename channel. Check your network connection and try again.'));
        });
    }
    
    return {
        type: actions.TypeKeys.RENAME_CHANNEL
    };
};

export function onInviteMemberToChannelStarted(): actions.InviteMemberToChannelStartedAction {
    return {
        type: actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_STARTED
    };
}

export function onInviteMemberToChannelFailed(): actions.InviteMemberToChannelFailedAction {
    return {
        type: actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_FAILED
    };
}

export function onInviteMemberToChannelCompleted(): actions.InviteMemberToChannelCompletedAction {
    return {
        type: actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_COMPLETED
    };
}

export const onInviteMemberToChannel = (channel: Channel): actions.InviteMemberToChannelAction => {    
    let email = prompt('Enter member email address');    
    if (email 
            && channel.customData.owner !== email
            && channel.customData.memberIds.findIndex(i => i === email) === -1) {
        store.dispatch(onInviteMemberToChannelStarted());  
        channel.customData.memberIds.push(email);
        let updatedChannel: ChannelDTO = {
            id: channel.id,
            name: channel.name,
            customData: JSON.stringify(channel.customData)
        };

        replaceChannel(updatedChannel)
        .then(() => {
            store.dispatch(onInviteMemberToChannelCompleted());
            store.dispatch(onGetAllChannels());
        })
        .catch((error: Error) => {
            store.dispatch(onInviteMemberToChannelFailed());
            store.dispatch(
                onShowError('Ooops!', 'Could not rename channel. Check your network connection and try again.'));
        });
    }
    
    return {
        type: actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL
    };
};

export function onGetChannelMembersStarted(): actions.GetChannelMembersStartedAction {
    return {
        type: actions.TypeKeys.GET_CHANNEL_MEMBERS_STARTED
    };
}

export function onGetChannelMembers(channel: Channel) {
    store.dispatch(onGetChannelMembersStarted());
    let memberIds = channel.customData.memberIds;
    memberIds.push(channel.customData.owner);

    for (let memberId of memberIds) {
        parse<User>(getUser(memberId))
        .then(member => {
            onChannelMemberRecieved(member);
        });
    }
}

export function onChannelMembersChanged(members: {[id: string]: Member}): actions.ChannelMemberRecievedAction {
    return {
        type: actions.TypeKeys.CHANNEL_MEMBER_RECIEVED,
        members: members
    };
}

function onChannelMemberRecieved(user: User) {
    let userCustomData: UserCustomData = JSON.parse(user.customData);  
    parse<string>(getUserPicture(userCustomData.pictureId))
    .then(pictureUrl => {
        let member: Member = {
            email: user.email,
            displayName: userCustomData.displayName,
            pictureUrl: pictureUrl
        };
        let members = store.getState().conversation.members;
        members[member.email] = member;
        store.dispatch(onChannelMembersChanged(members));
    });
}

export function onVoteMessageStarted(): actions.VoteMessageStartedAction {
    return {
        type: actions.TypeKeys.VOTE_MESSAGE_STARTED
    };
}

export function onVoteMessageFailed(): actions.VoteMessageFailedAction {
    return {
        type: actions.TypeKeys.VOTE_MESSAGE_FAILED
    };
}

export function onVoteMessageCompleted(): actions.VoteMessageCompletedAction {
    return {
        type: actions.TypeKeys.VOTE_MESSAGE_COMPLETED
    };
}

export const onVoteMessage = 
    (channelId: string, message: Message, userId: string, isPositive: boolean): actions.VoteMessageAction => {  
    store.dispatch(onVoteMessageStarted());

    try {
        let votedMessage = voteMessage(message, userId, isPositive);
            
        updateMessage(channelId, votedMessage)
        .then(() => {
            store.dispatch(onVoteMessageCompleted());
        })
        .catch((error: Error) => {
            store.dispatch(
                onShowError('Oops!', 'Could not vote message. Check your network connection and try again.'));
            store.dispatch(onVoteMessageFailed());
        });
    } catch {
        store.dispatch(onShowError('Oops!', 'You have already voted!'));
    }

    return {
        type: actions.TypeKeys.VOTE_MESSAGE
    };
};

function voteMessage(message: Message, userId: string, isPositive: boolean): Message {
    if (isPositive) {
        return upVoteMessage(message, userId);
    } else {
        return downVoteMessage(message, userId);
    }
}

function upVoteMessage(message: Message, userId: string): Message {   
    if (message.customData.upVotes.findIndex(i => i === userId) === -1) {
        // upvote
        message.customData.upVotes.push(userId);
        // remove downvote if exists
        let downVoteIndex = message.customData.downVotes.findIndex(i => i === userId);
        if (downVoteIndex > -1) {
            message.customData.downVotes.splice(downVoteIndex, 1);
        }
    } else {
        throw new Error();
    }

    return message;
}

function downVoteMessage(message: Message, userId: string): Message {
    if (message.customData.downVotes.findIndex(i => i === userId) === -1) {
        // downvote
        message.customData.downVotes.push(userId);
        // remove upvote if exists
        let upVoteIndex = message.customData.upVotes.findIndex(i => i === userId);
        if (upVoteIndex > -1) {
            message.customData.upVotes.splice(upVoteIndex, 1);
        }
    } else {
        throw new Error();
    }

    return message;
}
