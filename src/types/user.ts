export interface UserInfo {
  id: string
  username: string
  phone: string
  email: string
  avatar: string
}

export interface LoginPasswordParams {
  account: string
  password: string
}

export interface LoginCodeParams {
  phone: string
  code: string
}
