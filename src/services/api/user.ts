import { post, get } from '../axios'
import type { LoginPasswordParams, LoginCodeParams } from '@/types/user'

export const loginPasswordApi = (data: LoginPasswordParams) => {
  return post('/api/user/login', data)
}

export const loginCodeApi = (data: LoginCodeParams) => {
  return post('/api/user/login', data)
}

export const getUserInfoApi = () => {
  return get('/api/user/getUserInfo')
}
