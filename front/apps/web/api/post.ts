import request from "./axios";

class Boards {
    constructor() {
    }

    async getBoards(params: any) {
        let option = {
            "method": "GET",
            "url": `/boards`,
            "headers": {
                "Content-type": "application/json",
            },
            "params": params
        }
        return await request(option);
    }

    async createBoard(data: any) {
        let option = {
            "method": "POST",
            "url": `/boards`,
            "headers": {
                "Content-type": "multipart/form-data",
            },
            "data": data
        }
        return await request(option);
    }

    async updateBoard(data: any) {
        let option = {
            "method": "PUT",
            "url": `/boards/${data.id}`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data.body
        }
        return await request(option);
    }

    async deleteBoardById(id:number) {
        let option = {
            "method": "DELETE",
            "url": `/boards/${id}`,
            "headers": {
                "Content-type": "application/json",
            },
        }
        return await request(option);
    }

    async getBoardsByUser(params: any) {
        let option = {
            "method": "GET",
            "url": `/boards/user`,
            "headers": {
                "Content-type": "application/json",
            },
            "params": params
        }
        return await request(option);
    }

    async getBoardById(id:number) {
        let option = {
            "method": "GET",
            "url": `/boards/${id}`,
            "headers": {
                "Content-type": "application/json",
            },
        }
        return await request(option);
    }

    async changeBoardStatus(data:any) {
        let option = {
            "method": "PATCH",
            "url": `/boards/${data.id}/status`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data.body
        }
        return await request(option);
    }

    async updatePostHeart(data:any) {
        let option = {
            "method": "POST",
            "url": `/heart`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data
        }
        return await request(option);
    }

    async addComment(data: any) {
        let option = {
            "method": "POST",
            "url": `/comment`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data
        }
        return await request(option);
    }

    async updateComment(data: any) {
        let option = {
            "method": "PUT",
            "url": `/comment/${data.id}`,
            "headers": {
                "Content-type": "application/json",
            },
            "data": data.body
        }
        return await request(option);
    }

    async deleteCommentById(id: number) {
        let option = {
            "method": "PUT",
            "url": `/comment/${id}`,
            "headers": {
                "Content-type": "application/json",
            },
        }
        return await request(option);
    }
}

const boards = new Boards();
export default boards;