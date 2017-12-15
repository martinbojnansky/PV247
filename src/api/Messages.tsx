import { API_URI, API_KEY, defaultHeaders, authorizationHeader } from '../constants/ApiConstants';
import { validate } from './Response';
import { NewMessageDTO } from '../models/Message';

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

export const deleteMessage = (channelId: string, messageId: string) => {
    return fetch(
    `${API_URI}app/${API_KEY}/channel/${channelId}/message/${messageId}`,
    {
        method: 'DELETE',
        headers: authorizationHeader()
    })
    .then((response: Response) => {
        if (response.status < 200 && response.status >= 300) { 
            let error = new Error('Oops!');
            throw error;
        }
    });
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