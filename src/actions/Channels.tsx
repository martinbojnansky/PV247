import * as actions from './Actions';
import { getChannels, addChannel } from '../api/Channels';
import { getStore } from '../models/Store';
import { App } from '../models/App';
import Channel, { ChannelDTO, ChannelCustomData, NewChannelDTO } from '../models/Channel';
import { onShowError } from './Error';
import { onGetMessages, onGetChannelMembers } from './Conversation';
import { parse } from '../api/Response';
import { ActionCreator, Dispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { StoreState } from '../models/StoreState';

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

export const onGetAllChannels: ActionCreator<ThunkAction<Promise<actions.Action>, StoreState, void>> 
= () => {
    return async (dispatch: Dispatch<StoreState>, getState: () => StoreState, params): Promise<actions.Action> => {
        dispatch(onGetAllChannelsStarted());

        try {
            let app = await parse<App>(getChannels());
            
            let currentUserId: string = getState().profile.email;   
            let channels: Channel[] = parseChannels(app.channels);

            channels = channels.filter(c => 
                c.customData.owner === currentUserId
                || c.customData.memberIds.findIndex(i => i === currentUserId) !== -1);
                      
            dispatch(onGetAllChannelsCompleted(channels));
            return dispatch(onSelectedChannelChanged(channels[0]));
            
        } catch(error) {
            dispatch(onShowError('Ooops!', 'Unable to get channels. Check your network connection and try again.'));
            return dispatch(onGetAllChannelsFailed());
        }
    }
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
        getStore().dispatch(onCreateNewChannelStarted());
        let newChannelCustomData: ChannelCustomData = {
            owner: getStore().getState().profile.email,
            memberIds: [ ]
        };
        let newChannel: NewChannelDTO = {
            name: name,
            customData: JSON.stringify(newChannelCustomData)
        };

        addChannel(newChannel)
        .then(() => {
            getStore().dispatch(onCreateNewChannelCompleted());
            getStore().dispatch(onGetAllChannels());
        })
        .catch((error: Error) => {
            getStore().dispatch(onCreateNewChannelFailed());
            getStore().dispatch(
                onShowError('Ooops!', `Unable to create new channel. Check your network connection and try again.`));
        });
    }
    
    return {
        type: actions.TypeKeys.CREATE_NEW_CHANNEL
    };
}