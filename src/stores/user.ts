// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 重新定义UserInfo类型，避免循环依赖
export interface UserInfo {
  id: number
  nickname?: string
  name?: string
  loginId?: string
  email: string
  avatar?: string
}

export interface LoginData {
  token: string
  userInfo: UserInfo
}

export const useUserStore = defineStore('user', () => {
  // 安全地从localStorage获取数据
  const safeGetItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error)
      return null
    }
  }

  // 安全解析JSON
  const safeParseJSON = <T>(jsonString: string | null, fallback: T): T => {
    if (!jsonString || jsonString === 'null') return fallback
    try {
      return JSON.parse(jsonString)
    } catch (error) {
      console.warn('Failed to parse JSON:', error)
      return fallback
    }
  }

  // 状态（带类型）
  const token = ref<string>(safeGetItem('token') || '')
  const userInfo = ref<UserInfo | null>(safeParseJSON(safeGetItem('userInfo'), null))
  
  // 初始化时验证数据完整性 - 将在logout函数定义后处理
  // 注意：这里暂时注释掉，会在函数定义后重新检查

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)

  // 安全地设置localStorage
  const safeSetItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn(`Failed to set ${key} in localStorage:`, error)
    }
  }

  // 安全地移除localStorage
  const safeRemoveItem = (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error)
    }
  }

  // 方法（带参数类型和返回类型）
  const login = (loginData: LoginData): void => {
    token.value = loginData.token
    userInfo.value = loginData.userInfo

    // 持久化存储
    safeSetItem('token', loginData.token)
    safeSetItem('userInfo', JSON.stringify(loginData.userInfo))
    
    console.log('用户登录成功:', {
      token: loginData.token ? '已设置' : '未设置',
      userInfo: loginData.userInfo
    })
  }

  const logout = (): void => {
    token.value = ''
    userInfo.value = null
    safeRemoveItem('token')
    safeRemoveItem('userInfo')
  }

  // 初始化时验证数据完整性（在logout函数定义后执行）
  if (token.value && !userInfo.value) {
    console.warn('检测到token存在但用户信息缺失，清除登录状态')
    logout()
  }

  // 数据同步和验证方法
  const validateAndSyncData = (): void => {
    const currentToken = safeGetItem('token')
    const currentUserInfo = safeParseJSON(safeGetItem('userInfo'), null)
    
    if (!currentToken) {
      logout()
      return
    }
    
    if (!currentUserInfo) {
      logout()
      return
    }
    
    // 同步到响应式状态
    token.value = currentToken
    userInfo.value = currentUserInfo
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    login,
    logout,
    validateAndSyncData,
  }
})
