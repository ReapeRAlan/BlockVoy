import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.yovoywallet.com',
});

export default api;