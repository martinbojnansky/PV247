import { profile as reducer } from './../../reducers/Profile';
import { ProfileProps } from './../../components/Profile';
import * as actions from './../../actions/Actions';

const defaultProps: ProfileProps = { 
    email: 'test',
    isUserCustomDataLoaded: false,
    isChanged: false,
    userCustomData: {
        displayName: 'test',
        pictureId: 'test'
    },
    pictureUrl: 'test',
    newDisplayName: 'test',
    newPicturePath: 'test'
 };

describe('tests error reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('logs in', () => {
        const email = 'email';
        const props = { ...defaultProps };
        const action: actions.LogInCompletedAction = {
            type: actions.TypeKeys.LOG_IN_COMPLETED,
            email: email
        };
        expect(reducer(props, action)).toEqual({ ...defaultProps, email: email });
    });
    it('starts get user', () => {
        const props = { ...defaultProps, isUserCustomDataLoaded: true };
        const action: actions.GetUserStartedAction = {
            type: actions.TypeKeys.GET_USER_STARTED
        };
        expect(reducer(props, action)).toEqual(defaultProps);
    });
    it('fails get user', () => {
        const props = { ...defaultProps, isUserCustomDataLoaded: true };
        const action: actions.GetUserFailedAction = {
            type: actions.TypeKeys.GET_USER_FAILED
        };
        expect(reducer(props, action)).toEqual(defaultProps);
    });
    it('completes get user', () => {
        const userCustomData = {
            displayName: 'displayName',
            pictureId: 'pictureId'
        };
        const pictureUrl = 'pictureUrl';
        const action: actions.GetUserCompletedAction = {
            type: actions.TypeKeys.GET_USER_COMPLETED,
            userCustomData: userCustomData,
            pictureUrl: pictureUrl
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                isUserCustomDataLoaded: true,
                userCustomData: userCustomData,
                pictureUrl: pictureUrl,
                newDisplayName: userCustomData.displayName,
                newPicturePath: pictureUrl
            }
        );
    });
    it('cancels user', () => {
        const props = { ...defaultProps, isChanged: true };
        const action: actions.CancelUserAction = {
            type: actions.TypeKeys.CANCEL_USER
        };
        expect(reducer(props, action)).toEqual(defaultProps);
    });
    it('saves user', () => {
        const userCustomData = {
            displayName: 'displayName',
            pictureId: 'pictureId'
        };
        const props = {
             ...defaultProps, 
             isUserCustomDataLoaded: true,
             isChanged: true
        };
        const action: actions.SaveUserCompletedAction = {
            type: actions.TypeKeys.SAVE_USER_COMPLETED,
            email: 'email',
            userCustomData: userCustomData,
        };
        expect(reducer(props, action)).toEqual(
            {
                ...defaultProps,
                isUserCustomDataLoaded: false,
                userCustomData: userCustomData,
                isChanged: false         
            }
        );
    });
    it('changes display name', () => {
        const displayName = 'displayName';
        const action: actions.UserDisplayNameChangedAction = {
            type: actions.TypeKeys.USER_DISPLAY_NAME_CHANGED,
            displayName: displayName
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                newDisplayName: displayName,
                isChanged: true
            }
        );
    });
    it('changes picture', () => {
        const picturePath = 'picturePath';
        const action: actions.UserPictureChangedAction = {
            type: actions.TypeKeys.USER_PICTURE_CHANGED,
            picturePath: picturePath
        };
        expect(reducer(defaultProps, action)).toEqual(
            {
                ...defaultProps,
                newPicturePath: picturePath,
                isChanged: true
            }
        );
    });
});