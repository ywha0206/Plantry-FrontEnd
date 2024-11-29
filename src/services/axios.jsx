import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ${accessToken}';
// axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
// axiosInstance.defaults.withCredentials = true; // 쿠키 전송 허용


// axiosInstance.interceptors.request.use((config) => {
//     const { accessToken } = useAuthStore.getState();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
// });




export default axiosInstance;