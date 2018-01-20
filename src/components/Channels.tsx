import * as React from 'react';
import './../styles/Channels.css';
import * as actions from './../actions/Actions';
import Channel from '../models/Channel';
import { StoreState } from '../models/StoreState';
import { ChannelListItem } from './ChannelListItem';
import Conversation from './../containers/Conversation';

export interface ChannelsProps {
    isChannelsDataLoaded: boolean;
    channels: Channel[];
    selectedChannel?: Channel;
}

export interface ChannelsDispatch {
    onGetAllChannels: () => actions.GetAllChannelsAction;
    onSelectedChannelChanged: (selectedChannel: Channel) => actions.SelectedChannelChanged;
    onCreateNewChannel: () => actions.CreateNewChannelAction;
}

export default class Channels extends React.Component<ChannelsProps & ChannelsDispatch, StoreState> {
    componentWillMount() {
        this.props.onGetAllChannels();
    }

    render() {
        if (!this.props.isChannelsDataLoaded) {
            return (<div/>);
        }

        return (
            <div className="channels list-group">
                <div className="channels-list bg-light">
                    <ul className="list-group">
                        {getChannelListItems(this.props)}                        
                    </ul>
                    <button 
                        className="btn btn-success mt-3"
                        onClick={() => this.props.onCreateNewChannel()}
                    >
                        New channel
                    </button>             
                </div>
                <div className="channels-detail">
                    <Conversation/>
                </div>
            </div>
        );
    }
}

function getChannelListItems(props: ChannelsProps & ChannelsDispatch) {
    return props.channels.map(function(channel: Channel) {
        return (
            <ChannelListItem             
                key={channel.id}
                channel={channel} 
                onSelect={props.onSelectedChannelChanged}
                isSelected={
                    (props.selectedChannel !== undefined 
                        && props.selectedChannel.id === channel.id)
                }
            />
        );
    });
}