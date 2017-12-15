import { API_URI, defaultHeaders } from './../constants/ApiConstants';
import { validate } from './Response';

export const authorize = (email: string) => fetch(
    `${API_URI}auth`,
    {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(email)
    })
    .then(validate);