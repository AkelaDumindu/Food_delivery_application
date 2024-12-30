import axios, {AxiosInstance} from 'axios';
import BASE_URL from './apiConfig';

const instance:AxiosInstance =axios.create({
    baseURL:BASE_URL
});

instance.interceptors.request.use(
    (config) => {
      let token = document.cookie.split('; ').find(record => record.startsWith('token='));
      token = token?.split('=')[1];
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        // Handle token absence, possibly by redirecting to login
        console.log("Token is missing");
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default instance;