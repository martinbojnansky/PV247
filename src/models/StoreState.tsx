import { ProgressIndicatorProps } from './../components/ProgressIndicator';
import { ProfileProps } from './../components/Profile';
import { ChannelsProps } from './../components/Channels';
import { tryGetUserId } from './../constants/LocalStorageConstants';
import { getDefaultUserCustomData } from './../models/User';
import { ConversationProps } from '../components/Conversation';
import { MessageComposerProps } from '../components/MessageComposer';
import { ErrorProps } from '../components/Error';

export interface StoreState {
    progressIndicator: ProgressIndicatorProps;
    error: ErrorProps;
    profile: ProfileProps;
    channels: ChannelsProps;
    conversation: ConversationProps;
    messageComposer: MessageComposerProps;
}

export const initialState = (): StoreState =>
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
            email: tryGetUserId(),
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
            currentUserId: tryGetUserId()
        },
        messageComposer: {
            message: '',
            isEnabled: false
        }
    });
};