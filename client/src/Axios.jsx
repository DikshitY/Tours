import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8000',
});

Axios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export default Axios;
