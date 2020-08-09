import { get } from 'http';

// Promise wrapper around Node's verbose and relatively low level HTTP module.
export const authCheck = (token: string): Promise<string> =>
    new Promise((resolve, reject) => {
        const checkUrl = 'http://login.uci.edu/ucinetid/webauth_check?ucinetid_auth=';
        get(`${checkUrl}${token}`, (stream) => {
            let data = '';
    
            stream.on('data', (chunk) => {
                data += chunk;
            });
    
            stream.on('end', () => {
                resolve(data);
            });

            stream.once('error', (err) => {
                reject(err);
            });
        });
    });

// Transform from 'a=b\nc=d' to '{"a": "b", "c": "d"}' (JSON).
export const format = (data: string): any => {
    const obj = {};
    data
        .split('\n')
        .forEach(item => {
            const split = item.split('=')
            if (!split.length)
                return;
            const [key, value] = split;
            obj[key] = value 
        });
    return obj;
}