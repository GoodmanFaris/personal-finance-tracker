import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "API Error:",
        error.response.status,
        error.response.data
      );
    } 

    else if (error.request) {
      console.error("API Error: No response from server");
    } 
    else {
      console.error("API Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
