import { error as reducer } from './../../reducers/Error';
import { ErrorProps } from './../../components/Error';
import * as actions from './../../actions/Actions';

const defaultProps: ErrorProps = { 
    isVisible: false,
    title: '',
    description: ''
 };

describe('tests error reducer', () => {
    it('returns initial state', () => {
        const action: actions.Action = {
            type: actions.TypeKeys.NOT_SPECIFIED
        };
        expect(reducer(defaultProps, action)).toEqual(defaultProps);
    });
    it('shows error', () => {
        const action: actions.ShowErrorAction = {
            type: actions.TypeKeys.SHOW_ERROR,
            title: 'title',
            description: 'description'
        };
        expect(reducer(defaultProps, action)).toEqual(
            { 
                isVisible: true, 
                title: 'title', 
                description: 'description' }
            );
    });
    it('hides error', () => {
        const action: actions.HideErrorAction = {
            type: actions.TypeKeys.HIDE_ERROR
        };
        expect(reducer(
            { ...defaultProps, isVisible: true }, action)).toEqual(defaultProps);
    });
});