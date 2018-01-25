export const validate = (response: Response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {   
        let error = new Error('Oops!');
        throw error;
    }
};

export function parse<T>(promise: Promise<Response>): Promise<T> {
    return promise.then(response => { 
        return response.json() as Promise<T>;
    });
}