import request from "./axios";

class Boards {
    constructor() {
    }

    async getBoards(params: any) {
        let option = {
            "method": "GET",
            "url": `/boards`,
            "Content-Type": "application/json",
            "params": params
        }
        return await request(option);
    }

    async createBoard(data: any) {
        let option = {
            "method": "POST",
            "url": `/boards`,
            "Content-Type": "application/json",
            "data": data
        }
        return await request(option);
    }

    async getBoardsByUser(params: any) {
        let option = {
            "method": "GET",
            "url": `/boards/user`,
            "Content-Type": "application/json",
            "params": params
        }
        return await request(option);
    }

    async getBoardById(id:number) {
        let option = {
            "method": "GET",
            "url": `/boards/${id}`,
            "Content-Type": "application/json",
        }
        return await request(option);
    }

    async deleteBoardById(id:number) {
        let option = {
            "method": "DELETE",
            "url": `/boards/${id}`,
            "Content-Type": "application/json",
        }
        return await request(option);
    }

    async changeBoardStatus(data:any) {
        let option = {
            "method": "PATCH",
            "url": `/boards/${data.id}/status`,
            "Content-Type": "application/json",
            "data": data.body
        }
        return await request(option);
    }

    async changeBoardHit(data:any) {
        let option = {
            "method": "PATCH",
            "url": `/boards/${data.id}/hit`,
            "Content-Type": "application/json",
            "data": data.body
        }
        return await request(option);
    }

    async addComment(data: any) {
        let option = {
            "method": "POST",
            "url": `/comment`,
            "Content-Type": "application/json",
            "data": data
        }
        return await request(option);
    }

    async updateComment(data: any) {
        let option = {
            "method": "PUT",
            "url": `/comment/${data.id}`,
            "Content-Type": "application/json",
            "data": data.body
        }
        return await request(option);
    }

    async deleteCommentById(id: number) {
        let option = {
            "method": "PUT",
            "url": `/comment/${id}`,
            "Content-Type": "application/json",
        }
        return await request(option);
    }
}

const boards = new Boards();
export default boards;