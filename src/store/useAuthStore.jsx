import { create } from "zustand";
import { persist } from "zustand/middleware";
/*
    날짜 : 2024/11/28
    이름 : 박연화
    내용 : accessToken 처리 
*/

export const useAuthStore = create(
    (set) => ({
      accessToken: null, // 초기값: null
      authorized: false, // 로그인 상태 초기값
      
      // 토큰 저장 및 로그인 상태 업데이트
      setAccessToken: (token) => 
        set(() => ({ accessToken: token, authorized: !!token })),
        
      // 로그아웃 처리
      logout: () => {
        set(() => ({ accessToken: null, authorized: false }));
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // 로컬스토리지 키 이름
      getStorage: () => localStorage, // 기본값: localStorage
    }
);