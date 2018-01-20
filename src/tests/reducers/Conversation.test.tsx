import { conversation as reducer } from './../../reducers/Conversation';
import { ConversationProps } from './../../components/Conversation';
import * as actions from './../../actions/Actions';

const defaultProps: ConversationProps = { 
    channel: undefined,
    currentUserId: 'test',
    isConversationDataLoaded: false,
    members: {},
    messages: []
 };

describe('tests conversation reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('starts get channel members', () => {
        const members = {};
        members['test'] = { email: 'test', displayName: 'test', pictureUrl: 'test' };
        const props = { ...defaultProps, members: members };
        const action: actions.GetChannelMembersStartedAction = {
            type: actions.TypeKeys.GET_CHANNEL_MEMBERS_STARTED
        };
        expect(reducer(props, action)).toEqual(defaultProps);
    });
    it('recieves channel members', () => {  
        const channel = { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}};
        const action: actions.SelectedChannelChanged = {
            type: actions.TypeKeys.SELECTED_CHANNEL_CHANGED,
            selectedChannel: channel
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                channel: channel
            }
        );
    });
    it('changes selected channel', () => {
        const recievedMembers = {};
        recievedMembers[""] = { email: 'test', displayName: 'test', pictureUrl: 'test' };
        const action: actions.ChannelMemberRecievedAction = {
            type: actions.TypeKeys.CHANNEL_MEMBER_RECIEVED,
            members: recievedMembers
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                members: recievedMembers
            }
        );
    });
    it('starts get messages', () => {
        const action: actions.GetMessagesStartedAction = {
            type: actions.TypeKeys.GET_MESSAGES_STARTED,
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                isConversationDataLoaded: false
            }
        );
    });
    it('fails get messages', () => {
        const action: actions.GetMessagesFailedAction = {
            type: actions.TypeKeys.GET_MESSAGES_FAILED,
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                isConversationDataLoaded: true
            }
        );
    });
    it('completes get messages', () => {
        const messages = [ 
            { 
                id: 'test', value: 'test', 
                createdAt: 'test', createdBy: 'test',
                updatedAt: 'test', updatedBy: 'test',
                customData: { upVotes: ['test'], downVotes: ['test']}
            }
        ];
        const action: actions.GetMessagesCompletedAction = {
            type: actions.TypeKeys.GET_MESSAGES_COMPLETED,
            messages: messages
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                isConversationDataLoaded: true,
                messages: messages
            }
        );
    });
    it('logs out user', () => {
        const channel = { id: 'test', name: 'test', customData: { owner: 'test', memberIds: ['test']}};
        const props = { ...defaultProps, channel: channel };
        const action: actions.LogOutAction = {
            type: actions.TypeKeys.LOG_OUT,
        };
        expect(reducer(props, action)).toEqual(
            {
                ...defaultProps,
                channel: undefined
            }
        );
    });
});