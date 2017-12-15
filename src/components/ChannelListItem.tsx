import Channel from '../models/Channel';
import * as React from 'react';
import * as actions from './../actions/Actions';

export interface ChannelListItemProps {
    channel: Channel;
    isSelected: boolean;
}

export interface ChannelListItemDispatch {
    onSelect: (selectedChannel: Channel) => actions.SelectedChannelChanged;
}

export function ChannelListItem(props: ChannelListItemProps & ChannelListItemDispatch) {
    return (
        <li 
            className={`list-group-item list-group-item-action ${(props.isSelected) ? 'active' : ''}`}
            onClick={() => { props.onSelect(props.channel); }}
        >
            <span>{props.channel.name}</span>
        </li>
    );
}

export default ChannelListItem;