// types/auth.ts
export interface UserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface LoginData {
  token: string
  userInfo: UserInfo
}
