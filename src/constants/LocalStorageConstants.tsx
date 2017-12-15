export enum Keys {
    USER_ID = 'USER_ID',
    TOKEN = 'TOKEN'
}

export const getUserId = () => {
    let id = localStorage.getItem(Keys.USER_ID);
    if (id !== null) {
        return id;
    } else {
        return '';
    }
};