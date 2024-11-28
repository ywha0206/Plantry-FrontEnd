import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (userData) => set({ user: userData }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-store', // 저장소 이름
            getStorage: () => localStorage, // localStorage 사용
        }
    )
);

export default useUserStore;