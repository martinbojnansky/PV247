import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './../../actions/Channels';
import { initialState, StoreState } from './../../models/StoreState';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import Channel, { ChannelDTO } from '../../models/Channel';
import { App } from '../../models/App';

const middlewares = [thunk];
const mockStore = configureMockStore<StoreState>(middlewares);
const fetchMock = require('fetch-mock');
require('jest-localstorage-mock');

describe('tests channel thunks', () => {
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

  it('gets channels', () => {
    let app: App = {
        id: "app",
        channels: [
            { 
                id: "1",
                name: "owner",
                customData: JSON.stringify({
                    memberIds: ["b","c"],
                    owner: "a"
                })
            },
            { 
                id: "2",
                name: "member",
                customData: JSON.stringify({
                    memberIds: ["a","c"],
                    owner: "b"
                })
            },
            { 
                id: "3",
                name: "hidden",
                customData: JSON.stringify({
                    memberIds: ["b","c"],
                    owner: "c"
                })
            }
        ]
    };
    let channels: Channel[] = app.channels.map(function(dto: ChannelDTO) {
        return {
            id: dto.id,
            name: dto.name,
            customData: JSON.parse(dto.customData)
        };
    });

    fetchMock.get(`${API_URI}app/${API_KEY}`, app);

    const store = mockStore(initialState());

    const expectedActions = [
      actions.onGetAllChannelsStarted(),
      actions.onGetAllChannelsCompleted(channels)
    ];

    return store.dispatch(actions.onGetAllChannels())
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});