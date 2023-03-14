import request from "./axios";

class Boards {
    constructor() {
    }

    async getBoards(params) {
        let option = {
            "method": "GET",
            "url": `/boards`,
            "Content-Type": "application/json",
            "params": params
        }
        return await request(option);
    }

}

export default Boards;