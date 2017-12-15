export const validate = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {   
        let error = new Error('Oops!');
        throw error;
    }
};