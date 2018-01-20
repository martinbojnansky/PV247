import * as actions from './Actions';
import { getChannels, addChannel } from '../api/Channels';
import { store } from '../models/Store';
import { App } from '../models/App';
import Channel, { ChannelDTO, ChannelCustomData, NewChannelDTO } from '../models/Channel';
import { onShowError } from './Error';
import { onGetMessages, onGetChannelMembers } from './Conversation';

export function onGetAllChannelsStarted(): actions.GetAllChannelsStartedAction {
    return {
        type: actions.TypeKeys.GET_ALL_CHANNELS_STARTED
    };
}

export function onGetAllChannelsFailed(): actions.GetAllChannelsFailedAction {
    return {
        type: actions.TypeKeys.GET_ALL_CHANNELS_FAILED
    };
}

export function onGetAllChannelsCompleted(channels: Channel[]): actions.GetAllChannelsCompletedAction {
    return {
        type: actions.TypeKeys.GET_ALL_CHANNELS_COMPLETED,
        channels: channels
    };
}

export const onGetAllChannels = (): actions.GetAllChannelsAction => {
    store.dispatch(onGetAllChannelsStarted());

    getChannels()
    .then((app: App) => {
        let currentUserId: string = store.getState().profile.email;
        let channels: Channel[] = parseChannels(app.channels);
        channels = channels.filter(c => 
            c.customData.owner === currentUserId
            || c.customData.memberIds.findIndex(i => i === currentUserId) !== -1);
        store.dispatch(onSelectedChannelChanged(channels[0]));
        store.dispatch(onGetAllChannelsCompleted(channels));
    })
    .catch((error: Error) => {
        store.dispatch(onGetAllChannelsFailed());
        store.dispatch(onShowError('Ooops!', 'Unable to get channels. Check your network connection and try again.'));
    });
    
    return {
        type: actions.TypeKeys.GET_ALL_CHANNELS
    };
};

function parseChannels(dtos: ChannelDTO[]): Channel[] {
    return dtos.map(function(dto: ChannelDTO) {
        let channel: Channel = {
            id: dto.id,
            name: dto.name,
            customData: JSON.parse(dto.customData)
        };
        return channel;
    });
}

export function onSelectedChannelChanged(channel: Channel): actions.SelectedChannelChanged {
    onGetMessages(channel.id);
    onGetChannelMembers(channel);
    
    return {
        type: actions.TypeKeys.SELECTED_CHANNEL_CHANGED,
        selectedChannel: channel
    };
}

export function onCreateNewChannelStarted(): actions.CreateNewChannelStartedAction {
    return {
        type: actions.TypeKeys.CREATE_NEW_CHANNEL_STARTED
    };
}

export function onCreateNewChannelFailed(): actions.CreateNewChannelFailedAction {
    return {
        type: actions.TypeKeys.CREATE_NEW_CHANNEL_FAILED
    };
}

export function onCreateNewChannelCompleted(): actions.CreateNewChannelCompletedAction {
    return {
        type: actions.TypeKeys.CREATE_NEW_CHANNEL_COMPLETED
    };
}

export function onCreateNewChannel(): actions.CreateNewChannelAction {
    let name = prompt('Enter new channel name');
    if (name) {
        store.dispatch(onCreateNewChannelStarted());
        let newChannelCustomData: ChannelCustomData = {
            owner: store.getState().profile.email,
            memberIds: [ ]
        };
        let newChannel: NewChannelDTO = {
            name: name,
            customData: JSON.stringify(newChannelCustomData)
        };

        addChannel(newChannel)
        .then(() => {
            store.dispatch(onCreateNewChannelCompleted());
            store.dispatch(onGetAllChannels());
        })
        .catch((error: Error) => {
            store.dispatch(onCreateNewChannelFailed());
            store.dispatch(
                onShowError('Ooops!', `Unable to create new channel. Check your network connection and try again.`));
        });
    }
    
    return {
        type: actions.TypeKeys.CREATE_NEW_CHANNEL
    };
}