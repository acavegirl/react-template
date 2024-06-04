import { create } from 'zustand'

interface UserInfo {
  name: string;
  email: string;
}

interface UserState {
  name: string;
  email: string;
  setUserInfo: (info: UserInfo) => void
}

export const useUserStore = create<UserState>()((set) => ({
  name: '67',
  email: '67@aa.com',
  setUserInfo: (info) => set(() => ({
    name: info.name,
    email: info.email
  })),
}))