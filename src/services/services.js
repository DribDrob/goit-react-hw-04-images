import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '27565635-1fa3e47e8e30944c800be594a';

export async function getImages(query, page) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 12,
    });
    return await axios(`/?${params}`);
}