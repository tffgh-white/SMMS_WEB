import axios from 'axios'

// 这些保留为向后兼容，但推荐使用settings store
export const licenseList = {
  license0: 'LICENCE-66D8-9F96-0C7F0FBCD073',
  license1: '9AC4BBCB-C1D3-4453-BA13-B5B6886C55B1',
  license2: '23B828AB-CAD1-4939-A7DD-AED8BA4A201D',
}

export let baUsedLicense = licenseList.license0

// 动态更新证书的方法
export const updateUsedLicense = (license: string) => {
  baUsedLicense = license
}
// 沪深两市股票列表
const stockListApi = axios.create({
  baseURL: `https://api.mairuiapi.com/hslt/list/LICENCE-66D8-9F96-0C7F0FBCD073`,
  timeout: 10000,
})

// 沪深两市实时交易数据接口
const stockRealTimeApi = axios.create({
  baseURL: 'https://api.mairuiapi.com/hsstock/real/time',
  timeout: 10000,
})

// 历史分时交易
const createHistoricalDataInstance = (stockCode: string, license: string = baUsedLicense) =>
  axios.create({
    baseURL: `https://api.mairuiapi.com/hsstock/history/${stockCode}/d/n/${license}`,
    timeout: 10000,
  })

// 获取当前主机地址
const getBaseUrl = () => {
  // 如果是开发环境，自动检测当前主机
  if (import.meta.env.DEV) {
    const hostname = window.location.hostname
    // 如果是localhost或127.0.0.1，使用localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001/api'
    }
    // 否则使用当前主机地址
    return `http://${hostname}:3001/api`
  }
  // 生产环境使用相对路径
  return '/api'
}

// 用户认证相关API
const authApi = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
})

// 添加请求拦截器，自动添加token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器，处理token过期
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token过期或无效，清除本地存储并跳转到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// 股票相关API
export const stockAPI = {
  // 获取股票列表
  getStockList: () => stockListApi.get('/'),

  // 沪深两市实时交易数据接口
  getStockRealTime: (stockCode: string, license: string) =>
    stockRealTimeApi.get('/' + stockCode + '/' + license),

  // 历史分时交易数据
  getHistoryData: (
    stockCode: string = '000001.SZ',
    startDate?: string,
    endDate?: string,
    license?: string,
  ) => {
    const today = new Date()
    const defaultStartDate = new Date(today.getFullYear(), 0, 1) // 当年1月1日
    const defaultEndDate = today

    const st = startDate || defaultStartDate.toISOString().split('T')[0]?.replace(/-/g, '') || ''
    const et = endDate || defaultEndDate.toISOString().split('T')[0]?.replace(/-/g, '') || ''

    const historicalDataInstance = createHistoricalDataInstance(stockCode, license)
    return historicalDataInstance.get(`?st=${st}&et=${et}`)
  },

  // 收藏相关API（使用新的后端API）
  getFavorites: () => authApi.get('/favorites'),

  addFavorite: (stockCode: string) => authApi.post('/favorites', { stockCode }),

  removeFavorite: (stockCode: string) => authApi.delete(`/favorites/${stockCode}`),
}

// 用户认证相关API
export const authAPI = {
  // 用户登录
  login: (loginId: string, password: string) => authApi.post('/auth/login', { loginId, password }),

  // 用户注册
  register: (userData: { nickname: string; loginId: string; email: string; password: string }) =>
    authApi.post('/auth/register', userData),

  // 获取用户信息
  getUserInfo: (token: string) =>
    authApi.get('/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),
}
