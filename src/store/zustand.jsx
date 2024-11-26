import { create } from "zustand";

const useUsersStore = create((set) => ({
  usersData: [],  // 초기값으로 빈 배열을 설정
  setUsersData: (data) => set({ usersData: data }),  // usersData를 업데이트하는 함수
}));

export default useUsersStore;