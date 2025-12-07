// 通用 API 响应接口
export interface ApiResponse<T = string> {
  success: boolean
  message?: string
  data?: T
  code?: number
  error?: string
}

// 收藏相关接口
export interface FavoriteResponse {
  success: boolean
  message?: string
  data?: {
    favoriteId?: string
    stockCode?: string
    createdAt?: string
  }
}

// 股票历史数据接口
export interface StockHistoryData {
  t: string      // 时间
  o: number      // 开盘价
  h: number      // 最高价
  l: number      // 最低价
  c: number      // 收盘价
  v: number      // 成交量
  a: number      // 成交额
  pc: number     // 前收盘价
  sf: number     // 特殊标志
}

// 股票相关接口
export interface StockListItem {
  dm: string
  mc: string
  jys: string
}

export interface StockRealTimeData {
  pe: number
  ud: number
  pc: number
  zf: number
  tr: number
  pb_ratio: number
  p: number
  o: number
  h: number
  l: number
  yc: number
  cje: number
  v: number
  pv: number
  tv: number
  t: string
}
