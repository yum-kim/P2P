import request from './axios';

class Auth {
    private accessToken: string | null;

    constructor() {
        this.accessToken = null;
    }

    getToken() {
        return this.accessToken;
    }

    setToken(data: string) {
        this.accessToken = data;
        console.log(this.accessToken);
    }

    async login(data: any) {
        let option = {
            "method": "POST",
            "url": `/auth/signin`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data
        }
        return await request(option);
    }

    async signup(data: any) {
        let option = {
            "method": "POST",
            "url": `/auth/signup`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data
        }
        return await request(option);
    }

    async updateUserInfo(data: any) {
        let option = {
            "method": "PUT",
            "url": `/auth`,
            "headers": {
                "Content-type": "multipart/form-data",
            },
            "data": data
        }
        return await request(option);
    }
}

const auth = new Auth();
export default auth;