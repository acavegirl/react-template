import { http } from '@/utils/http';

//登录
export const LoginApi = <T>(params: any) => http.post<T>('/user/login', params, {timeout: 15000});