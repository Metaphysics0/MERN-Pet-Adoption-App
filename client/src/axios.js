import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mern-pet-app.herokuapp.com/api',
});

export default instance;
