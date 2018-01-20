import { ChannelsProps } from './../components/Channels';
import * as actions from './../actions/Actions';

export function channels(state: ChannelsProps, action: actions.Action): ChannelsProps {
  switch (action.type) {  
    case actions.TypeKeys.GET_ALL_CHANNELS_COMPLETED:
      return { ...state, channels: action.channels, isChannelsDataLoaded: true };
    case actions.TypeKeys.GET_ALL_CHANNELS_FAILED:
      return { ...state, isChannelsDataLoaded: true };
    case actions.TypeKeys.SELECTED_CHANNEL_CHANGED:
      return { ...state, selectedChannel: action.selectedChannel };
    default:
        return { ...state };
  }
}