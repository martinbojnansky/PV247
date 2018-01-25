export enum Keys {
    USER_ID = 'USER_ID',
    TOKEN = 'TOKEN'
}

export const getUserId = () => localStorage.getItem(Keys.USER_ID);
export const tryGetUserId = () => {
    let id = localStorage.getItem(Keys.USER_ID);
    if (id !== null) {
        return id;
    } else {
        return '';
    }
};