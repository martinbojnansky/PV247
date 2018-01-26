import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './../../actions/MessageComposer';
import { initialState, StoreState } from './../../models/StoreState';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import { reducers } from './../../reducers/Reducers';

const middlewares = [thunk];
const mockStore = configureMockStore<StoreState>(middlewares);
const fetchMock = require('fetch-mock');

describe('tests message composer thunks', () => {
    beforeAll(() => {
        localStorage.setItem(localStorageKeys.TOKEN, "");
        localStorage.setItem(localStorageKeys.USER_ID, "a");
      });
      afterAll(() => {
        localStorage.clear();
      });
      afterEach(() => {
        fetchMock.restore();
      });

  it('sends message', () => {
    let message = "message";
    let channelId = "1";
    let state = initialState();
    state.conversation.channel = {
        id: channelId,
        name: '',
        customData: {
            memberIds: ["b","c"],
            owner: "a"
        }
    };

    fetchMock.post(`${API_URI}app/${API_KEY}/channel/${channelId}/message`, {});
    fetchMock.get(`${API_URI}app/${API_KEY}/channel/${channelId}/message`, {});

    let store = mockStore(state);
    store.replaceReducer(reducers);

    const expectedActions = [
      actions.onSendMessageStarted(),
      actions.onSendMessageCompleted(message)
    ];
    expectedActions;

    return store.dispatch(actions.onSendMessage(message))
    .then(() => {
        let recievedActions = store.getActions();
        expectedActions.forEach(expectedAction => {
            expect(recievedActions).toContainEqual(expectedAction);
        });
    });
  });
});