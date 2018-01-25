import * as api from './../../api/Messages';
import { parse } from '../../api/Response';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import Message, { NewMessageDTO, MessageCustomData, MessageDTO } from '../../models/Message';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';

const fetchMock = require('fetch-mock');
require('jest-localstorage-mock');

describe('tests messages api', () => {
    beforeAll(() => {
        localStorage.setItem(localStorageKeys.TOKEN, "token");
      });
      afterAll(() => {
        localStorage.clear();
      });
      afterEach(() => {
        fetchMock.restore();
      });
  
  it('sends message', () => {
    let channelId = "id";
    let messageCustomData: MessageCustomData = {
        upVotes: ["a"],
        downVotes: ["b"]
    };
    let newMessageDto: NewMessageDTO = {
        value: "message",
        customData: JSON.stringify(messageCustomData)
    };
    fetchMock.post(`${API_URI}app/${API_KEY}/channel/${channelId}/message`, JSON.stringify(""));
    api.sendMessage(channelId, newMessageDto);
  });

  it('updates message', () => {
    let channelId = "id";
    let messageCustomData: MessageCustomData = {
        upVotes: ["a"],
        downVotes: ["b"]
    };
    let message: Message = {
        id: "id",
        value: "message",
        customData: messageCustomData,
        createdAt: "createdAt",
        createdBy: "createdBy",
        updatedAt: "updatedAt",
        updatedBy: "updatedBy"
    };
    fetchMock.put(`${API_URI}app/${API_KEY}/channel/${channelId}/message/${message.id}`, JSON.stringify(""));
    api.updateMessage(channelId, message);
  });

  it('deletes message', () => {
    let channelId = "id";
    let messageId = "id";
    fetchMock.delete(`${API_URI}app/${API_KEY}/channel/${channelId}/message/${messageId}`, JSON.stringify(""));
    api.deleteMessage(channelId, messageId);
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
    let messages: MessageDTO[] = [messageDto];
    fetchMock.get(`${API_URI}app/${API_KEY}/channel/${channelId}/message`, messages);
    parse<MessageDTO[]>(api.getMessages(channelId)).then(response => {
        expect(response).toEqual(messages);
      });
  });
});