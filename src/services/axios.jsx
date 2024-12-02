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
      config.headers.Authorization = ` Bearer ${accessToken}`;
  }
  return config;
}, (error) => {
  // 요청 에러 처리
  return Promise.reject(error);
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답이 정상일 경우 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 오류이고, 재시도하지 않은 요청인지 확인
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정
      console.log("401이 떴다!");

      try {
        const refreshAccessToken = useAuthStore.getState().refreshAccessToken;
        // 새 액세스 토큰 갱신 시도
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // 새 액세스 토큰을 Authorization 헤더에 추가
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          // 실패한 요청을 다시 실행
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        // 추가 실패 시 로그아웃 처리
        useAuthStore.getState().logout();
      }
    }

    // 갱신 실패 또는 다른 에러일 경우 에러 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;