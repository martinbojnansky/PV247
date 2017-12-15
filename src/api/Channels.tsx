import { API_URI, API_KEY, defaultHeaders } from '../constants/ApiConstants';
import { validate } from './Response';
import { NewChannelDTO, ChannelOperation, ChannelOperationType, ChannelDTO } from '../models/Channel';

export const addChannel = (newChannel: NewChannelDTO) => {
    let operation: ChannelOperation = {
        path: '/channels/-',
        op: ChannelOperationType.ADD,
        value: newChannel
    };

    return fetch(
    `${API_URI}app/${API_KEY}`,
    {
        method: 'PATCH',
        headers: defaultHeaders('application/json'),
        body: `[${JSON.stringify(operation)}]`
    })
    .then(validate);
};

export const getChannels = () => {
    return fetch(
    `${API_URI}app/${API_KEY}`,
    {
        method: 'GET',
        headers: defaultHeaders('application/json')
    })
    .then(validate);
};

export const deleteChannel = (channelId: string) => {
    let operation: ChannelOperation = {
        path: `/channels/${channelId}`,
        op: ChannelOperationType.REMOVE,
        value: undefined
    };

    return fetch(
    `${API_URI}app/${API_KEY}`,
    {
        method: 'PATCH',
        headers: defaultHeaders('application/json'),
        body: `[${JSON.stringify(operation)}]`
    })
    .then(validate);
};

export const replaceChannel = (channel: ChannelDTO) => {
    let operation: ChannelOperation = {
        path: `/channels/${channel.id}`,
        op: ChannelOperationType.REPLACE,
        value: channel
    };

    return fetch(
    `${API_URI}app/${API_KEY}`,
    {
        method: 'PATCH',
        headers: defaultHeaders('application/json'),
        body: `[${JSON.stringify(operation)}]`
    })
    .then(validate);
};