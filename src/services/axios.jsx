import axios from 'axios'
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  // 최신 상태를 항상 가져오기 위해 함수 호출
  const accessToken = useAuthStore.getState().getAccessToken();
  console.log("엑시오스 인터셉터 엑세스 토큰: ", accessToken);

  if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  // 요청 에러 처리
  return Promise.reject(error);
});

export default axiosInstance;