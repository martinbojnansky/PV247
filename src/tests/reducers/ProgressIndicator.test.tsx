import { progressIndicator as reducer } from './../../reducers/ProgressIndicator';
import { ProgressIndicatorProps } from './../../components/ProgressIndicator';
import * as actions from './../../actions/Actions';

const defaultProps: ProgressIndicatorProps = { 
    isActive: false
 };

describe('tests progress indicator reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('shows progress indicator', () => {
        const actionTypes = [
            actions.TypeKeys.LOG_IN_STARTED,
            actions.TypeKeys.GET_USER_STARTED,
            actions.TypeKeys.SAVE_USER_STARTED,
            actions.TypeKeys.CREATE_NEW_CHANNEL_STARTED,
            actions.TypeKeys.GET_ALL_CHANNELS_STARTED,
            actions.TypeKeys.DELETE_CHANNEL_STARTED,
            actions.TypeKeys.DELETE_MESSAGE_STARTED,
            actions.TypeKeys.RENAME_CHANNEL_STARTED,
            actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_STARTED
        ]

        actionTypes.forEach(type => {
            const action: any = {
                type: type
            };
            expect(reducer(defaultProps, action)).toEqual(
                { 
                    ...defaultProps,
                    isActive: true
                }
            );
        });
    });
    it('hides progress indicator', () => {
        const actionTypes = [
            actions.TypeKeys.LOG_IN_COMPLETED,
            actions.TypeKeys.LOG_IN_FAILED,  
            actions.TypeKeys.GET_USER_COMPLETED,
            actions.TypeKeys.GET_USER_FAILED,   
            actions.TypeKeys.SAVE_USER_COMPLETED,
            actions.TypeKeys.SAVE_USER_FAILED, 
            actions.TypeKeys.CREATE_NEW_CHANNEL_COMPLETED,
            actions.TypeKeys.CREATE_NEW_CHANNEL_FAILED,  
            actions.TypeKeys.GET_ALL_CHANNELS_COMPLETED,
            actions.TypeKeys.GET_ALL_CHANNELS_FAILED,
            actions.TypeKeys.DELETE_CHANNEL_COMPLETED,
            actions.TypeKeys.DELETE_CHANNEL_FAILED,
            actions.TypeKeys.DELETE_MESSAGE_COMPLETED,
            actions.TypeKeys.DELETE_MESSAGE_FAILED,
            actions.TypeKeys.RENAME_CHANNEL_COMPLETED,
            actions.TypeKeys.RENAME_CHANNEL_FAILED,
            actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_COMPLETED,
            actions.TypeKeys.INVITE_MEMBER_TO_CHANNEL_FAILED,
        ]

        actionTypes.forEach(type => {
            const action: any = {
                type: type
            };
            expect(reducer(defaultProps, action)).toEqual(
                { 
                    ...defaultProps,
                    isActive: false
                }
            );
        });
    });
});