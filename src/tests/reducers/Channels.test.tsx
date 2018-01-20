import { channels as reducer } from './../../reducers/Channels';
import { ChannelsProps } from './../../components/Channels';
import * as actions from './../../actions/Actions';

const defaultProps: ChannelsProps = { 
    isChannelsDataLoaded: false,
    channels: [],
    selectedChannel: undefined
 };

describe('tests channels reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('completes get all channels', () => {
        const action: actions.GetAllChannelsCompletedAction = {
            type: actions.TypeKeys.GET_ALL_CHANNELS_COMPLETED,
            channels: [
                { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}}
            ]
        };
        expect(reducer(defaultProps, action)).toEqual(
            { 
                isChannelsDataLoaded: true,
                channels: [
                    { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}}
                ],
                selectedChannel: undefined
            }
        );
    });
    it('fails get all channels', () => {
        const action: actions.GetAllChannelsFailedAction = {
            type: actions.TypeKeys.GET_ALL_CHANNELS_FAILED
        };
        expect(reducer(defaultProps, action)).toEqual(
            { 
                isChannelsDataLoaded: true,
                channels: [],
                selectedChannel: undefined
            }
        );
    });
    it('changes selected channel', () => {
        const action: actions.SelectedChannelChanged = {
            type: actions.TypeKeys.SELECTED_CHANNEL_CHANGED,
            selectedChannel: { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}}
        };
        expect(reducer(defaultProps, action)).toEqual(
            { 
                isChannelsDataLoaded: false,
                channels: [],
                selectedChannel: { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}}
            }
        );
    });
});