import { Keys as localStorageKeys } from './LocalStorageConstants';

export const API_URI = 'https://pv247messaging.azurewebsites.net/api/';
export const API_KEY = '60bfbb65-7732-4dac-b3a9-93330a70025c';

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