import { produce } from 'immer';
import { create } from 'zustand'

export interface UserInfo {
  name: string;
  email: string;
}

interface UserState {
  name: string;
  email: string;
  age: {
    value: number;
  }
  setUserInfo: (info: UserInfo) => void;
  incAge: ()=>void;
}

export const useUserStore = create<UserState>()((set) => ({
  name: '67',
  email: '67@aa.com',
  age: {
    value: 18,
  },
  // 1. 不可变模型，返回新的值
  setUserInfo: (info) => set(() => ({
    name: info.name,
    email: info.email,
  })),

  // 2. 深层嵌套处理，借助其他库，否则就要使用非常难看的写法
  // normalInc: () =>
  //   set((state) => ({
  //     deep: {
  //       ...state.deep,
  //       nested: {
  //         ...state.deep.nested,
  //         obj: {
  //           ...state.deep.nested.obj,
  //           count: state.deep.nested.obj.count + 1
  //         }
  //       }
  //     }
  //   })),
  // 更新方法也可以卸载store外面
  incAge: () => set(produce((state: any)=>{++state.age.value}))
}))