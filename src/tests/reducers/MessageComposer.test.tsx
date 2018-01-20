import { messageComposer as reducer } from './../../reducers/MessageComposer';
import { MessageComposerProps } from './../../components/MessageComposer';
import * as actions from './../../actions/Actions';

const defaultProps: MessageComposerProps = { 
    isEnabled: true,
    message: ''
 };

describe('tests error reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('starts send message', () => {
        const props = { ...defaultProps, isEnabled: true};
        const action: actions.SendMessageStartedAction = {
            type: actions.TypeKeys.SEND_MESSAGE_STARTED
        };
        expect(reducer(props, action)).toEqual(
            { 
                ...defaultProps,
                isEnabled: false
            }
        );
    });
    it('fails send message', () => {
        const props = { ...defaultProps, isEnabled: false };
        const action: actions.SendMessageFailedAction = {
            type: actions.TypeKeys.SEND_MESSAGE_FAILED
        };
        expect(reducer(props, action)).toEqual(
            { 
                ...defaultProps,
                isEnabled: true
            }
        );
    });
    it('completes send message', () => {
        const message = 'test';
        const props = { ...defaultProps, isEnabled: true, message: message };
        const action: actions.SendMessageCompletedAction = {
            type: actions.TypeKeys.SEND_MESSAGE_COMPLETED,
            message: message
        };
        expect(reducer(props, action)).toEqual(
            { 
                ...defaultProps,
                isEnabled: true
            }
        );
    });
    it('changes selected channel', () => {
        const channel = { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}};
        const props = { ...defaultProps };
        const action: actions.SelectedChannelChanged = {
            type: actions.TypeKeys.SELECTED_CHANNEL_CHANGED,
            selectedChannel: channel
        };
        expect(reducer(props, action)).toEqual(
            { 
                ...defaultProps,
                isEnabled: true
            }
        );
    });
    it('changes message', () => {
        const message = 'test';
        const action: actions.MessageChangedAction = {
            type: actions.TypeKeys.MESSAGE_CHANGED,
            message: message
        };
        expect(reducer(defaultProps, action)).toEqual(
            { 
                ...defaultProps,
                message: message
            }
        );
    });
});