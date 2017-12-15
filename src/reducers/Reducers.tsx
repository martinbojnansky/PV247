import { combineReducers } from 'redux';
import { StoreState } from './../models/StoreState';
import { progressIndicator } from './ProgressIndicator';
import { profile } from './Profile';
import { channels } from './Channels';
import { conversation } from './Conversation';
import { messageComposer } from './MessageComposer';
import { error } from './Error';

export const reducers = combineReducers<StoreState>({ 
    progressIndicator: progressIndicator,
    error: error,
    profile: profile,
    channels: channels,
    conversation: conversation,
    messageComposer: messageComposer
});