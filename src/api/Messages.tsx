import { API_URI, API_KEY, defaultHeaders, authorizationHeader } from '../constants/ApiConstants';
import { validate } from './Response';
import Message, { NewMessageDTO } from '../models/Message';

export const sendMessage = (channelId: string, message: NewMessageDTO) => {
    return fetch(
    `${API_URI}app/${API_KEY}/channel/${channelId}/message`,
    {
        method: 'POST',
        headers: defaultHeaders('application/json'),
        body: JSON.stringify(message)
    })
    .then(validate);
};

export const updateMessage = (channelId: string, message: Message) => {
    let newMessageDto: NewMessageDTO = {
        value: message.value,
        customData: JSON.stringify(message.customData)
    };
    return fetch(
    `${API_URI}app/${API_KEY}/channel/${channelId}/message/${message.id}`,
    {
        method: 'PUT',
        headers: defaultHeaders('application/json'),
        body: JSON.stringify(newMessageDto)
    })
    .then(validate);
};

export const deleteMessage = (channelId: string, messageId: string) => {
    return fetch(
    `${API_URI}app/${API_KEY}/channel/${channelId}/message/${messageId}`,
    {
        method: 'DELETE',
        headers: authorizationHeader()
    })
    .then(validate);
};

export const getMessages = (channelId: string) => {
    return fetch(
    `${API_URI}app/${API_KEY}/channel/${channelId}/message`,
    {
        method: 'GET',
        headers: defaultHeaders('application/json'),
    })
    .then(validate);
};