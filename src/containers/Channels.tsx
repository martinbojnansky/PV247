import { StoreState } from './../models/StoreState';
import { connect, Dispatch } from 'react-redux';
import Channels, { ChannelsProps, ChannelsDispatch } from './../components/Channels';
import * as actions from './../actions/Channels';
import Channel from '../models/Channel';

export function mapStateToProps({ channels }: StoreState): ChannelsProps {
  return {
    isChannelsDataLoaded: channels.isChannelsDataLoaded,
    channels: channels.channels,
    selectedChannel: channels.selectedChannel
  };
}

export function mapDispatchToProps(dispatch: Dispatch<StoreState>): ChannelsDispatch {
  return {
    onGetAllChannels: async () => await dispatch(actions.onGetAllChannels()),   
    onSelectedChannelChanged: (selectedChannel: Channel) => dispatch(actions.onSelectedChannelChanged(selectedChannel)),
    onCreateNewChannel: () => dispatch(actions.onCreateNewChannel())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);