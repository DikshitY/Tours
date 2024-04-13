import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://tours-fk0i.onrender.com',
});

Axios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export default Axios;
