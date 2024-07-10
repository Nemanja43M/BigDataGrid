import { RequestHandler } from 'express';
import { AxiosService } from '../services/axios.service';
import { UrlTransform } from '../services/transformer.service';

const URL = 'https://rest-test-eight.vercel.app/api/test';

export const dataFileHandler: RequestHandler = async (req, res, next) => {
    try {
        const axiosService = new AxiosService();
        const response = await axiosService.streamGetRequest(URL);
        res.setHeader('Content-Type', 'application/json');
        response.data.pipe(new UrlTransform()).pipe(res);
    } catch (error) {
        next(error);
    }
};
