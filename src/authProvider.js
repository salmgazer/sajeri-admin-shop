import { AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { email, password } = params;
        const request = new Request(process.env.API_URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
            });
    }

    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    
    return Promise.resolve();
}
