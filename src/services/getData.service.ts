import { pipeline } from 'stream/promises';
import { fileRepository } from '../repositories/file.repository';
import { AxiosService } from './axios.service';
import { UrlTransform } from './transformer.service';

const URL = 'https://rest-test-eight.vercel.app/api/test';

export async function saveLatesResponse() {
    try {
        const axiosService = new AxiosService();
        const response = await axiosService.streamGetRequest(URL);

        await fileRepository.clear();

        await pipeline(response.data, new UrlTransform());
    } catch (error) {
        console.error('Error saving latest response:', error);
    }
}
