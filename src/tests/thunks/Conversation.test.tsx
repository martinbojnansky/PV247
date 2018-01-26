import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './../../actions/Conversation';
import { initialState, StoreState } from './../../models/StoreState';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import { MessageCustomData, MessageDTO, Message } from '../../models/Message';

const middlewares = [thunk];
const mockStore = configureMockStore<StoreState>(middlewares);
const fetchMock = require('fetch-mock');

describe('tests conversation thunks', () => {
    beforeAll(() => {
        localStorage.setItem(localStorageKeys.TOKEN, "");
        localStorage.setItem(localStorageKeys.USER_ID, "");
      });
      afterAll(() => {
        localStorage.clear();
      });
      beforeEach(() => {

      });
      afterEach(() => {
        fetchMock.restore();
      });

  it('gets messages', () => {
    let channelId = "id";
    let messageCustomData: MessageCustomData = {
        upVotes: ["a"],
        downVotes: ["b"]
    };
    let messageDto: MessageDTO = {
        id: "id",
        value: "message",
        customData: JSON.stringify(messageCustomData),
        createdAt: "createdAt",
        createdBy: "createdBy",
        updatedAt: "updatedAt",
        updatedBy: "updatedBy"
    };
    let messageDtos: MessageDTO[] = [messageDto];
    let messages: Message[] = [{
          id: messageDto.id,
          value: messageDto.value,
          createdAt: messageDto.createdAt,
          createdBy: messageDto.createdBy,
          updatedAt: messageDto.updatedAt,
          updatedBy: messageDto.updatedBy,
          customData: JSON.parse(messageDto.customData)
    }];
    
    fetchMock.get(`${API_URI}app/${API_KEY}/channel/${channelId}/message`, messageDtos);

    const store = mockStore(initialState());

    const expectedActions = [
      actions.onGetMessagesStarted(),
      actions.onGetMessagesCompleted(messages)
    ];

    return store.dispatch(actions.onGetMessages(channelId))
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});