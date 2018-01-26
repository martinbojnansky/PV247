import * as api from './../../api/Channels';
import { parse } from '../../api/Response';
import { API_URI, API_KEY } from '../../constants/ApiConstants';
import Channel, { NewChannelDTO, ChannelCustomData, ChannelDTO } from '../../models/Channel';
import { App } from '../../models/App';
import { Keys as localStorageKeys } from './../../constants/LocalStorageConstants';

const fetchMock = require('fetch-mock');

describe('tests channels api', () => {
    beforeAll(() => {
        localStorage.setItem(localStorageKeys.TOKEN, "token");
      });
      afterAll(() => {
        localStorage.clear();
      });
      afterEach(() => {
        fetchMock.restore();
      });
  
  it('adds channel', () => {
    let newChannelCustomData: ChannelCustomData = {
        memberIds: ["b", "c"],
        owner: "a"
    };
    let newChannel: NewChannelDTO = {
        name: "channel",
        customData: JSON.stringify(newChannelCustomData)
    };
    let app: App = {
        id: "app",
        channels: [
            {
                id: "id",
                name: newChannel.name,
                customData: JSON.stringify(newChannelCustomData)
            }
        ]
    };

    fetchMock.patch(`${API_URI}app/${API_KEY}`, app);
    parse<App>(api.addChannel(newChannel)).then(response => {
      expect(response).toEqual(app);
    });
  });

  it('gets channels', () => {
    let channelCustomData: ChannelCustomData = {
        memberIds: ["b", "c"],
        owner: "a"
    };
    let channel: Channel = {
        id: "id",
        name: "channel",
        customData: channelCustomData
    };
    let app: App = {
        id: "app",
        channels: [
            { 
                id: channel.id,
                name: channel.name,
                customData: JSON.stringify(channel.customData)
            }
        ]
    };

    fetchMock.get(`${API_URI}app/${API_KEY}`, app);
    parse<App>(api.getChannels()).then(response => {
      expect(response).toEqual(app);
    });
  });

  it('deletes channel', () => {
    let channelCustomData: ChannelCustomData = {
        memberIds: ["b", "c"],
        owner: "a"
    };
    let channel: Channel = {
        id: "id",
        name: "channel",
        customData: channelCustomData
    };
    let app: App = {
        id: "app",
        channels: [
            { 
                id: channel.id,
                name: channel.name,
                customData: JSON.stringify(channel.customData)
            }
        ]
    };

    fetchMock.patch(`${API_URI}app/${API_KEY}`, app);
    parse<App>(api.deleteChannel(channel.id)).then(response => {
      expect(response).toEqual(app);
    });
  });

  it('replaces channel', () => {
    let channelCustomData: ChannelCustomData = {
        memberIds: ["b", "c"],
        owner: "a"
    };
    let channelDto: ChannelDTO = { 
        id: "id",
        name: "name",
        customData: JSON.stringify(channelCustomData)
    };
    let app: App = {
        id: "app",
        channels: [
            channelDto
        ]
    };

    fetchMock.patch(`${API_URI}app/${API_KEY}`, app);
    parse<App>(api.deleteChannel(channelDto.id)).then(response => {
      expect(response).toEqual(app);
    });
  });
});