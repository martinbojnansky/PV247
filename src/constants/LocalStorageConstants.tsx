export enum Keys {
    USER_ID = 'USER_ID',
    TOKEN = 'TOKEN'
}

export const getUserId = () => localStorage.getItem(Keys.USER_ID);

export function tryGetLocalStorageValue(storage: Storage, key: string): string {
    let value = localStorage.getItem(key);
    
    if (value !== null) {
        return value;
    } else {
        return '';
    }
};