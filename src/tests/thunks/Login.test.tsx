import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './../../actions/Login';
import { initialState, StoreState } from './../../models/StoreState';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';
import { API_URI } from '../../constants/ApiConstants';

const middlewares = [thunk];
const mockStore = configureMockStore<StoreState>(middlewares);
const fetchMock = require('fetch-mock');
require('jest-localstorage-mock');

describe('tests login thunks', () => {
    beforeAll(() => {
      localStorage.setItem(localStorageKeys.TOKEN, "");
      localStorage.setItem(localStorageKeys.USER_ID, "");
      });
      afterAll(() => {
        localStorage.clear();
      });
      afterEach(() => {
        fetchMock.restore();
      });

  it('logs in', () => {
    const email = 'email';
    const token = "token";

    fetchMock.post(`${API_URI}auth`, JSON.stringify(token));

    const store = mockStore(initialState());

    const expectedActions = [
      actions.onLogInStarted(),
      { type: "@@router/CALL_HISTORY_METHOD", 
        payload: {
          args: ["/", store.getState()],
          method: "push"
         }
      },
      actions.onLogInCompleted(email)
    ];

    return store.dispatch(actions.onLogIn(email))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(localStorage.__STORE__[localStorageKeys.TOKEN]).toBe(token);
      expect(localStorage.__STORE__[localStorageKeys.USER_ID]).toBe(email);
    });
  });
});