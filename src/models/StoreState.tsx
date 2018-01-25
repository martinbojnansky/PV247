import { ProgressIndicatorProps } from './../components/ProgressIndicator';
import { ProfileProps } from './../components/Profile';
import { ChannelsProps } from './../components/Channels';
import { tryGetLocalStorageValue } from './../constants/LocalStorageConstants';
import { getDefaultUserCustomData } from './../models/User';
import { ConversationProps } from '../components/Conversation';
import { MessageComposerProps } from '../components/MessageComposer';
import { ErrorProps } from '../components/Error';
import { Keys as localStorageKeys } from './../constants/LocalStorageConstants';

export interface StoreState {
    progressIndicator: ProgressIndicatorProps;
    error: ErrorProps;
    profile: ProfileProps;
    channels: ChannelsProps;
    conversation: ConversationProps;
    messageComposer: MessageComposerProps;
}

export function initialState(): StoreState
{
    return ({
        progressIndicator: {
            isActive: false, 
        },
        error: {
            isVisible: false,
            title: '',
            description: ''
        },
        profile: {
            email: tryGetLocalStorageValue(localStorage, localStorageKeys.USER_ID),
            isUserCustomDataLoaded: false,
            isChanged: false,
            userCustomData: getDefaultUserCustomData(),
            pictureUrl: '',
            newDisplayName: '',
            newPicturePath: ''
        },
        channels: {
            isChannelsDataLoaded: false,
            channels: [],
            selectedChannel: undefined
        },
        conversation: {
            isConversationDataLoaded: false,
            channel: undefined,
            messages: [],
            members: {},
            currentUserId: tryGetLocalStorageValue(localStorage, localStorageKeys.USER_ID)
        },
        messageComposer: {
            message: '',
            isEnabled: false
        }
    });
};