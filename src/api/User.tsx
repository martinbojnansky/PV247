import { API_URI, API_KEY, defaultHeaders, authorizationHeader } from './../constants/ApiConstants';
import { validate } from './Response';
import { UserCustomData } from '../models/User';

export const getUser = (email: string) => fetch(
    `${API_URI}${API_KEY}/user/${email}`,
    {
        method: 'GET',
        headers: defaultHeaders()
    })
    .then(validate);

export const saveUser = (email: string, userCustomData: UserCustomData) => fetch(
    `${API_URI}${API_KEY}/user/${email}`,
    {
        method: 'PUT',
        headers: defaultHeaders('application/json'),
        body: `'${JSON.stringify(userCustomData)}'`
    })
    .then(validate);

export const getUserPicture = (fileId: string) => fetch(
    `${API_URI}file/${fileId}/download-link`,
    {
        method: 'GET',
        headers: defaultHeaders()
    })
    .then(validate);

export const saveUserPicture = (pictureFile: File) => { 
    let formData: FormData = new FormData();
    formData.append('Files', pictureFile);
    
    return fetch(
        `${API_URI}file`,
        {
            method: 'POST',
            headers: authorizationHeader(),
            body: formData
        })
    .then(validate);
};
