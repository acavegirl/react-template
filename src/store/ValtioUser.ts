import { proxy } from 'valtio'
import { UserInfo } from './user'

export const userStateValtio = proxy({ 
  name: '67Valtion',
  email: '67valtion@gmail.com',
  age: {
    value: 18,
  }
})

// 1. 可变模型，每次action并不产生新的值（除非赋值成一个新的值）
export const setUserInfoValtio = (info: UserInfo) => {
  userStateValtio.name = info.name
  userStateValtio.email = info.email
}

// 2. 深层嵌套处理，直接改变值
export const incAgeValtio = () => {
  userStateValtio.age.value++
}