import request from './axios';

class Chat {
    constructor() {
    }

    async getChatList() {
        let option = {
            "method": "GET",
            "url": `/chat`,
            "headers": {
                "Content-type": "application/json",
            },
        }
        return await request(option);
    }

    async getChatDetail(params: any) {
        let option = {
            "method": "GET",
            "url": `/chat/detail`,
            "headers": {
                "Content-type": "application/json",
            },
            "params": params
        }
        return await request(option);
    }

    async createChat(data: any) {
        let option = {
            "method": "POST",
            "url": `/chat`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data
        }
        return await request(option);
    }
}

const chat = new Chat();
export default chat;