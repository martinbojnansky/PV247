export interface UserCustomData {
    displayName: string;
    pictureId: string;
}

export interface User {
    email: string;
    customData: string;
}

export default User;

export const getDefaultUserCustomData = (): UserCustomData => {
    return {
        displayName: '',
        pictureId: ''
    };
};