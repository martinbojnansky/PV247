import { Keys as localStorageKeys } from './LocalStorageConstants';

export const API_URI = 'https://pv247messaging.azurewebsites.net/api/';
export const API_KEY = '5b329b01-b443-4fe9-9041-fad6ba39d5d7';

export const defaultHeaders = (contentType: string = 'application/json'): Headers => {
    return new Headers({
        'Content-Type': contentType,
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
    });
};

export const authorizationHeader = (): Headers => {
    return new Headers({
        'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
     });
};