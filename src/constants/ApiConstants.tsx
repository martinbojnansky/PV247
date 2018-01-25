import { Keys as localStorageKeys } from './LocalStorageConstants';

export const API_URI = 'https://pv247messaging.azurewebsites.net/api/';
export const API_KEY = '5b329b01-b443-4fe9-9041-fad6ba39d5d7';

export function defaultHeaders(contentType: string = 'application/json') {
    return new Headers({
        'Content-Type': contentType,
        'Accept': 'application/json',
        'Authorization': `Bearer ${token()}`
    });
};

export function authorizationHeader() {
    return new Headers({
        'Authorization': `Bearer ${token()}`
     });
};

const token = () => localStorage.getItem(localStorageKeys.TOKEN);