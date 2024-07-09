import axios from "axios";

const GET = 'get';

export class AxiosService {
    async streamGetRequest(url: string) {
        return axios({
            method: GET,
            responseType: 'stream',
            url,
        });
    }
}