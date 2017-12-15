import { UserCustomData } from './../models/User';
import Channel from '../models/Channel';
import Message from '../models/Message';
import { Member } from '../models/Member';

export interface NotSpecifiedAction {
  type: TypeKeys.NOT_SPECIFIED;
}

export enum TypeKeys {    
  NOT_SPECIFIED = 'NOT_SPECIFIED',
  /* Error */
  SHOW_ERROR = 'SHOW_ERROR',
  HIDE_ERROR = 'HIDE_ERROR',
  /* Login */
  LOG_IN = 'LOG_IN',
  LOG_IN_STARTED = 'LOG_IN_STARTED',
  LOG_IN_FAILED = 'LOG_IN_FAILED',
  LOG_IN_COMPLETED = 'LOG_IN_COMPLETED',
  /* Logout */
  LOG_OUT = 'LOG_OUT',
  /* Profile */
  GET_USER = 'GET_USER',
  GET_USER_STARTED = 'GET_USER_STARTED',
  GET_USER_FAILED = 'GET_USER_FAILED',
  GET_USER_COMPLETED = 'GET_USER_COMPLETED',
  SAVE_USER = 'SAVE_USER',
  SAVE_USER_STARTED = 'SAVE_USER_STARTED',
  SAVE_USER_FAILED = 'SAVE_USER_FAILED',
  SAVE_USER_COMPLETED = 'SAVE_USER_COMPLETED',
  CANCEL_USER = 'CANCEL_USER',
  USER_DISPLAY_NAME_CHANGED = 'USER_DISPLAY_NAME_CHANGED',
  USER_PICTURE_CHANGED = 'USER_PICTURE_CHANGED',
  /* Channels */
  CREATE_NEW_CHANNEL = 'CREATE_NEW_CHANNEL',
  CREATE_NEW_CHANNEL_STARTED = 'CREATE_NEW_CHANNEL_STARTED',
  CREATE_NEW_CHANNEL_FAILED = 'CREATE_NEW_CHANNEL_FAILED',
  CREATE_NEW_CHANNEL_COMPLETED = 'CREATE_NEW_CHANNEL_COMPLETED',
  DELETE_CHANNEL = 'DELETE_CHANNEL',
  DELETE_CHANNEL_STARTED = 'DELETE_CHANNEL_STARTED',
  DELETE_CHANNEL_FAILED = 'DELETE_CHANNEL_FAILED',
  DELETE_CHANNEL_COMPLETED = 'DELETE_CHANNEL_COMPLETED',
  GET_ALL_CHANNELS = 'GET_ALL_CHANNELS',
  GET_ALL_CHANNELS_STARTED = 'GET_ALL_CHANNELS_STARTED',
  GET_ALL_CHANNELS_FAILED = 'GET_ALL_CHANNELS_FAILED',
  GET_ALL_CHANNELS_COMPLETED = 'GET_ALL_CHANNELS_COMPLETED',
  SELECTED_CHANNEL_CHANGED = 'SELECTED_CHANNEL_CHANGED',
  RENAME_CHANNEL = 'RENAME_CHANNEL',
  RENAME_CHANNEL_STARTED = 'RENAME_CHANNEL_STARTED',
  RENAME_CHANNEL_FAILED = 'RENAME_CHANNEL_FAILED',
  RENAME_CHANNEL_COMPLETED = 'RENAME_CHANNEL_COMPLETED',
  INVITE_MEMBER_TO_CHANNEL = 'INVITE_MEMBER_TO_CHANNEL',
  INVITE_MEMBER_TO_CHANNEL_STARTED = 'INVITE_MEMBER_TO_CHANNEL_STARTED',
  INVITE_MEMBER_TO_CHANNEL_FAILED = 'INVITE_MEMBER_TO_CHANNEL_FAILED',
  INVITE_MEMBER_TO_CHANNEL_COMPLETED = 'INVITE_MEMBER_TO_CHANNEL_COMPLETED',
  GET_CHANNEL_MEMBERS_STARTED = 'GET_CHANNEL_MEMBERS_STARTED',
  CHANNEL_MEMBER_RECIEVED = 'CHANNEL_MEMBER_RECIEVED',
  /* Messages */
  GET_MESSAGES = 'GET_MESSAGE',
  GET_MESSAGES_STARTED = 'GET_MESSAGES_STARTED',
  GET_MESSAGES_FAILED = 'GET_MESSAGES_FAILED',
  GET_MESSAGES_COMPLETED = 'GET_MESSAGES_COMPLETED',
  SEND_MESSAGE = 'SEND_MESSAGE',
  SEND_MESSAGE_STARTED = 'SEND_MESSAGE_STARTED',
  SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED',
  SEND_MESSAGE_COMPLETED = 'SEND_MESSAGE_COMPLETED',
  MESSAGE_CHANGED = 'MESSAGE_CHANGED',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
  DELETE_MESSAGE_STARTED = 'DELETE_MESSAGE_STARTED',
  DELETE_MESSAGE_FAILED = 'DELETE_MESSAGE_FAILED',
  DELETE_MESSAGE_COMPLETED = 'DELETE_MESSAGE_COMPLETED'
}

/* Error */
export interface ShowErrorAction {
  type: TypeKeys.SHOW_ERROR;
  title: string;
  description: string;
}

export interface HideErrorAction {
  type: TypeKeys.HIDE_ERROR;
}

/* Login */
export interface LogInAction {
  type: TypeKeys.LOG_IN;
}

export interface LogInStartedAction {
  type: TypeKeys.LOG_IN_STARTED;
}

export interface LogInFailedAction {
  type: TypeKeys.LOG_IN_FAILED;
}

export interface LogInCompletedAction {
  type: TypeKeys.LOG_IN_COMPLETED;
  email: string;
}

/* Logout */
export interface LogOutAction {
  type: TypeKeys.LOG_OUT;
}

/* Profile */
export interface GetUserAction {
  type: TypeKeys.GET_USER;
}

export interface GetUserStartedAction {
  type: TypeKeys.GET_USER_STARTED;
}

export interface GetUserFailedAction {
  type: TypeKeys.GET_USER_FAILED;
}

export interface GetUserCompletedAction {
  type: TypeKeys.GET_USER_COMPLETED;
  userCustomData: UserCustomData;
  pictureUrl: string;
}

export interface SaveUserAction {
  type: TypeKeys.SAVE_USER;
}

export interface SaveUserStartedAction {
  type: TypeKeys.SAVE_USER_STARTED;
}

export interface SaveUserFailedAction {
  type: TypeKeys.SAVE_USER_FAILED;
}

export interface SaveUserCompletedAction {
  type: TypeKeys.SAVE_USER_COMPLETED;
  email: string;
  userCustomData: UserCustomData;
}

export interface CancelUserAction {
  type: TypeKeys.CANCEL_USER;
}

export interface UserDisplayNameChangedAction {
  type: TypeKeys.USER_DISPLAY_NAME_CHANGED;
  displayName: string;
}

export interface UserPictureChangedAction {
  type: TypeKeys.USER_PICTURE_CHANGED;
  picturePath: string;
}

/* Channels */
export interface CreateNewChannelAction {
  type: TypeKeys.CREATE_NEW_CHANNEL;
}

export interface CreateNewChannelStartedAction {
  type: TypeKeys.CREATE_NEW_CHANNEL_STARTED;
}

export interface CreateNewChannelFailedAction {
  type: TypeKeys.CREATE_NEW_CHANNEL_FAILED;
}

export interface CreateNewChannelCompletedAction {
  type: TypeKeys.CREATE_NEW_CHANNEL_COMPLETED;
}

export interface DeleteChannelAction {
  type: TypeKeys.DELETE_CHANNEL;
}

export interface DeleteChannelStartedAction {
  type: TypeKeys.DELETE_CHANNEL_STARTED;
}

export interface DeleteChannelFailedAction {
  type: TypeKeys.DELETE_CHANNEL_FAILED;
}

export interface DeleteChannelCompletedAction {
  type: TypeKeys.DELETE_CHANNEL_COMPLETED;
}

export interface GetAllChannelsAction {
  type: TypeKeys.GET_ALL_CHANNELS;
}

export interface GetAllChannelsStartedAction {
  type: TypeKeys.GET_ALL_CHANNELS_STARTED;
}

export interface GetAllChannelsFailedAction {
  type: TypeKeys.GET_ALL_CHANNELS_FAILED;
}

export interface GetAllChannelsCompletedAction {
  type: TypeKeys.GET_ALL_CHANNELS_COMPLETED;
  channels: Channel[];
}

export interface SelectedChannelChanged {
  type: TypeKeys.SELECTED_CHANNEL_CHANGED;
  selectedChannel: Channel;
}

export interface RenameChannelAction {
  type: TypeKeys.RENAME_CHANNEL;
}

export interface RenameChannelStartedAction {
  type: TypeKeys.RENAME_CHANNEL_STARTED;
}

export interface RenameChannelFailedAction {
  type: TypeKeys.RENAME_CHANNEL_FAILED;
}

export interface RenameChannelCompletedAction {
  type: TypeKeys.RENAME_CHANNEL_COMPLETED;
}

export interface InviteMemberToChannelAction {
  type: TypeKeys.INVITE_MEMBER_TO_CHANNEL;
}

export interface InviteMemberToChannelStartedAction {
  type: TypeKeys.INVITE_MEMBER_TO_CHANNEL_STARTED;
}

export interface InviteMemberToChannelFailedAction {
  type: TypeKeys.INVITE_MEMBER_TO_CHANNEL_FAILED;
}

export interface InviteMemberToChannelCompletedAction {
  type: TypeKeys.INVITE_MEMBER_TO_CHANNEL_COMPLETED;
}

export interface GetChannelMembersStartedAction {
  type: TypeKeys.GET_CHANNEL_MEMBERS_STARTED;
}

export interface ChannelMemberRecievedAction {
  type: TypeKeys.CHANNEL_MEMBER_RECIEVED;
  members: {[id: string]: Member};
}

/* Messages */
export interface GetMessagesAction {
  type: TypeKeys.GET_MESSAGES;
}

export interface GetMessagesStartedAction {
  type: TypeKeys.GET_MESSAGES_STARTED;
}

export interface GetMessagesFailedAction {
  type: TypeKeys.GET_MESSAGES_FAILED;
}

export interface GetMessagesCompletedAction {
  type: TypeKeys.GET_MESSAGES_COMPLETED;
  messages: Message[];
}

export interface SendMessageAction {
  type: TypeKeys.SEND_MESSAGE;
}

export interface SendMessageStartedAction {
  type: TypeKeys.SEND_MESSAGE_STARTED;
}

export interface SendMessageFailedAction {
  type: TypeKeys.SEND_MESSAGE_FAILED;
}

export interface SendMessageCompletedAction {
  type: TypeKeys.SEND_MESSAGE_COMPLETED;
  message: string;
}

export interface MessageChangedAction {
  type: TypeKeys.MESSAGE_CHANGED;
  message: string;
}

export interface DeleteMessageAction {
  type: TypeKeys.DELETE_MESSAGE;
}

export interface DeleteMessageStartedAction {
  type: TypeKeys.DELETE_MESSAGE_STARTED;
}

export interface DeleteMessageFailedAction {
  type: TypeKeys.DELETE_MESSAGE_FAILED;
}

export interface DeleteMessageCompletedAction {
  type: TypeKeys.DELETE_MESSAGE_COMPLETED;
}

export type Action = 
NotSpecifiedAction
/* Error */
| ShowErrorAction
| HideErrorAction
/* Login */
| LogInAction
| LogInStartedAction
| LogInFailedAction
| LogInCompletedAction 
/* Logout */
| LogOutAction
/* Profile */
| GetUserAction
| GetUserStartedAction
| GetUserFailedAction
| GetUserCompletedAction
| SaveUserAction
| SaveUserStartedAction
| SaveUserFailedAction
| SaveUserCompletedAction
| CancelUserAction  
| UserDisplayNameChangedAction
| UserPictureChangedAction
/* Channels */
| CreateNewChannelAction
| CreateNewChannelStartedAction
| CreateNewChannelFailedAction
| CreateNewChannelCompletedAction
| DeleteChannelAction
| DeleteChannelStartedAction
| DeleteChannelFailedAction
| DeleteChannelCompletedAction
| GetAllChannelsAction
| GetAllChannelsStartedAction
| GetAllChannelsFailedAction
| GetAllChannelsCompletedAction
| SelectedChannelChanged
| RenameChannelAction
| RenameChannelStartedAction
| RenameChannelFailedAction
| RenameChannelCompletedAction
| InviteMemberToChannelAction
| InviteMemberToChannelStartedAction
| InviteMemberToChannelFailedAction
| InviteMemberToChannelCompletedAction
| GetChannelMembersStartedAction
| ChannelMemberRecievedAction
/* Messages */
| GetMessagesAction
| GetMessagesStartedAction
| GetMessagesFailedAction
| GetMessagesCompletedAction
| SendMessageAction
| SendMessageStartedAction
| SendMessageFailedAction
| SendMessageCompletedAction
| MessageChangedAction
| DeleteMessageAction
| DeleteMessageStartedAction
| DeleteMessageFailedAction
| DeleteMessageCompletedAction
;