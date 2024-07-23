//configuramos axios y su domino base
import axios from "axios";
const url = import.meta.env.VITE_BACKEND;

const instance = axios.create({
  baseURL: url,
});

// Interceptor para añadir el token a las solicitudes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default instance;
