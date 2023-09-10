import axios from 'axios';
const API_KEY = "live_oF8LAyBgFl3f7g9EFkLmFYqgNea8M3zFMwBvpi4eyUvi5aVGCfGZZIizcp4KJD30";
const url = 'https://api.thecatapi.com/v1'
axios.defaults.headers.common['x-api-key'] = API_KEY;

const fetchBreeds = () => {
    return axios.get(`${url}/breeds`)
};

const fetchCatByBreed = (breedId) => {
    return axios.get(`${url}/images/search?breed_ids=${breedId}`)
};

export { fetchBreeds, fetchCatByBreed };