import request from './axios';

class Auth {
    constructor() {
        this.accessToken = null;
    }

    getToken() {
        return this.accessToken;
    }

    setToken(data) {
        this.accessToken = data;
    }

    async login(data) {
        let option = {
            "method": "POST",
            "url": `/auth/signin`,
            "Content-Type": "application/json",
            "data": data
        }
        return await request(option);
    }
}

const auth = new Auth();
export default auth;