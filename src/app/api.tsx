import axios from 'axios'

// axios.defaults.baseURL = 'https://acp.void.to/api/';
axios.defaults.baseURL = 'http://localhost:8000/';

const api = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return {
        "error": "Server nicht erreichbar."
      }
    }
    else if (error.response.data !== undefined) {
      return error.response;
    }
    return error;
  });

export default api;