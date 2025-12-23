<template>
  <div class="stock-container">
    <!-- 左右布局容器 -->
    <div class="layout-container">
      <!-- 左边：实时数据展示区 -->
      <div class="real-time-display" v-if="beShowStock">
        <!-- 股票信息头 -->
        <div class="stock-header">
          <div class="stock-title">
            <h2>{{ beShowStock.mc }}</h2>
            <div class="stock-code">
              <span class="exchange">{{ getExchangeName(beShowStock.jys) }}</span>
              <span class="code">{{ beShowStock.dm }}</span>
            </div>
          </div>
          <div class="button-container">
            <div class="historical-time-sharing-trading-button" @click="goToDashboard">
              历史分时交易
            </div>
            <FavoriteButton
              v-model="isFavorited"
              :disabled="!userStore.isLoggedIn"
              @change="handleStockFavoriteChange(beShowStock, $event)"
            />
          </div>
        </div>

        <!-- 核心价格信息 -->
        <div class="main-quote" v-if="realTimeData && !loadingRealTime">
          <div class="price-section">
            <div class="current-price" :class="getChangeColor(realTimeData.ud)">
              {{ formatNumber(realTimeData.p, 2) }}
            </div>
            <div class="change-info">
            <div class="change-amount" :class="getComputedChangeColor('amount')">
              <div class="change-label">涨跌额</div>
              <div class="change-value">{{ getChangeAmount }}</div>
            </div>
            <div class="change-percent" :class="getComputedChangeColor('percent')">
              <div class="change-label">涨跌幅</div>
              <div class="change-value">{{ getChangePercentage }}</div>
            </div>
            </div>
          </div>

          <!-- 关键价格指标 -->
          <div class="key-metrics">
            <div class="metric-row">
              <div class="metric-item">
                <span class="label">今开</span>
                <span class="value">{{ getDisplayValue(realTimeData.o, 2) }}</span>
              </div>
              <div class="metric-item">
                <span class="label">最高</span>
                <span class="value up-color">{{ getDisplayValue(realTimeData.h, 2) }}</span>
              </div>
              <div class="metric-item">
                <span class="label">最低</span>
                <span class="value down-color">{{ getDisplayValue(realTimeData.l, 2) }}</span>
              </div>
              <div class="metric-item">
                <span class="label">昨收</span>
                <span class="value">{{ getDisplayValue(realTimeData.yc, 2) }}</span>
              </div>
            </div>
          </div>

          <!-- 成交量与成交额 -->
          <div class="volume-section">
            <div class="volume-row">
              <div class="volume-item">
                <span class="label">成交量</span>
                <span class="value highlight">{{ formatVolume(realTimeData.v) }}手</span>
              </div>
              <div class="volume-item">
                <span class="label">成交额</span>
                <span class="value highlight">{{ formatAmount(realTimeData.cje) }}</span>
              </div>
            </div>
          </div>

          <!-- 详细数据网格 -->
          <div class="data-grid">
            <!-- 第一行：基本指标 -->
            <div class="grid-row">
              <div class="grid-item">
                <div class="item-label">涨跌额</div>
                <div class="item-value" :class="getChangeColor(realTimeData.ud)">
                  {{ getChangeAmount }}
                </div>
              </div>
              <div class="grid-item">
                <div class="item-label">涨跌幅</div>
                <div class="item-value" :class="getChangeColor(realTimeData.ud)">
                  {{ getChangePercentage }}
                </div>
              </div>
              <div class="grid-item">
                <div class="item-label">换手率</div>
                <div class="item-value">{{ getTurnoverRate }}</div>
              </div>
              <div class="grid-item">
                <div class="item-label">量比</div>
                <div class="item-value" :class="getVolumeRatioColor(realTimeData.pv)">
                  {{ getDisplayValue(realTimeData.pv, 2) }}
                </div>
              </div>
            </div>

            <!-- 第二行：估值指标 -->
            <div class="grid-row">
              <div class="grid-item">
                <div class="item-label">市盈率(PE)</div>
                <div class="item-value" :class="getPERatioColor(realTimeData.pe)">
                  {{ getDisplayValue(realTimeData.pe, 2) }}
                </div>
              </div>
              <div class="grid-item">
                <div class="item-label">市净率(PB)</div>
                <div class="item-value" :class="getPBRatioColor(realTimeData.pb_ratio)">
                  {{ getDisplayValue(realTimeData.pb_ratio, 2) }}
                </div>
              </div>
              <div class="grid-item">
                <div class="item-label">振幅</div>
                <div class="item-value">{{ getAmplitude }}</div>
              </div>
              <div class="grid-item">
                <div class="item-label">总市值</div>
                <div class="item-value">{{ formatAmount(realTimeData.tv) }}</div>
              </div>
            </div>

            <!-- 第三行：时间信息 -->
            <div class="grid-row">
              <div class="grid-item double">
                <div class="item-label">更新时间</div>
                <div class="item-value time">{{ getUpdateTime }}</div>
              </div>
              <div class="grid-item double">
                <div class="item-label">振幅（(最高-最低)/昨收）</div>
                <div class="item-value">{{ getAmplitude }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-else-if="loadingRealTime" class="loading-container">
          <div class="spinner"></div>
          <p>正在获取实时数据...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="realTimeError" class="error-container">
          <div class="error-icon">📈</div>
          <p class="error-message">{{ realTimeError }}</p>
        </div>

        <!-- 无数据状态 -->
        <div v-else class="no-data">
          <div class="no-data-icon">💼</div>
          <p>点击右侧股票查看实时数据</p>
        </div>
      </div>

      <!-- 右边：股票列表（保持你的原样） -->
      <div class="simple-stock-list">
        <div class="title">
          <div class="title-text">沪深两市股票</div>
          <div class="refresh-button" @click="handleClickRefreshButton">
            <img src="../assets/refresh-32.png" />
          </div>
        </div>

        <div class="stock-container-list">
          <ul class="stock-items">
            <li
              v-for="stock in stockList"
              :key="stock.dm"
              class="stock-item"
              :class="{ active: beShowStock?.dm === stock.dm }"
              @click="selectStock(stock)"
            >
              <span class="stock-code">{{ stock.dm }}</span>
              <span class="stock-name">{{ stock.mc }}</span>
              <span class="stock-exchange">{{ getExchangeName(stock.jys) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { baUsedLicense, stockAPI } from '@/utils/api'
import FavoriteButton from '../components/FavoriteButton.vue'
import { useUserStore } from '@/stores/user'
import { useStockStore, type StockWithFavorite } from '@/stores/stock'
import type { StockListItem, StockRealTimeData } from '@/types/api'

const userStore = useUserStore()
const router = useRouter()
const stockStore = useStockStore()

// 使用store中定义的类型
type Stock = StockWithFavorite

// 股票列表（计算属性，从store获取）
const stockList = computed(() => stockStore.stockList)
const loading = ref(false)
const error = ref('')

// 要展示的股票（计算属性，从store获取）
const beShowStock = computed(() => stockStore.selectedStock)

// 收藏按钮状态
const isFavorited = ref(false)

// 收藏列表
const favoriteList = ref<Stock[]>([])
const loadingFavorite = ref(false)
const favoriteError = ref('')

const realTimeData = ref<StockRealTimeData>()
const loadingRealTime = ref(false)
const realTimeError = ref('')

// 获取收藏列表
const fetchFavoriteList = async () => {
  if (!userStore.isLoggedIn) {
    favoriteList.value = []
    return
  }

  loadingFavorite.value = true
  favoriteError.value = ''

  try {
    const response = await stockAPI.getFavorites()

    // 使用类型守卫检查响应结构
    if (response.data && response.data.success && response.data.data?.favorites) {
      const favorites = response.data.data.favorites
      // 从收藏列表中获取股票代码，然后从股票列表中匹配完整信息
      const favoriteCodes = favorites.map(
        (fav: { stockCode: string; createdAt: string }) => fav.stockCode,
      )

      // 根据收藏代码从当前股票列表中获取完整股票信息
      const allStocks = stockStore.stockList
      favoriteList.value = allStocks
        .filter((stock) => {
          const stockCodePrefix = stock.dm.substring(0, 6)
          return favoriteCodes.includes(stockCodePrefix)
        })
        .map((stock) => ({
          ...stock,
          isFavorited: true,
        }))

      // 同步收藏状态到股票列表
      syncFavoriteStatus()
    } else {
      throw new Error(response.data?.message || '收藏列表数据格式错误')
    }
  } catch (err) {
    favoriteError.value = handleError(err)
    console.error('获取收藏列表失败:', err)
  } finally {
    loadingFavorite.value = false
  }
}

// 同步收藏状态
const syncFavoriteStatus = () => {
  if (!userStore.isLoggedIn) return

  // 创建收藏股票代码的集合（使用前6位数字）
  const favoriteCodes = new Set(favoriteList.value.map((stock) => stock.dm.substring(0, 6)))

  // 获取当前股票列表并更新收藏状态
  const currentStockList = stockStore.stockList
  const updatedStockList = currentStockList.map((stock) => ({
    ...stock,
    isFavorited: favoriteCodes.has(stock.dm.substring(0, 6)),
  }))

  // 通过store更新股票列表
  stockStore.setStockList(updatedStockList)

  // 更新当前选中股票的收藏状态
  if (beShowStock.value?.dm) {
    const stockCodePrefix = beShowStock.value.dm.substring(0, 6)
    const updatedSelectedStock = {
      ...beShowStock.value,
      isFavorited: favoriteCodes.has(stockCodePrefix),
    }
    stockStore.setSelectedStock(updatedSelectedStock)
    isFavorited.value = favoriteCodes.has(stockCodePrefix)
  }
}

// 添加收藏
const addToFavorite = async (stockCode: string): Promise<boolean> => {
  if (!userStore.isLoggedIn) {
    return false
  }

  try {
    const response = await stockAPI.addFavorite(stockCode)

    // 检查响应结构
    if (response.data && response.data.success) {
      return true
    } else {
      // 如果 response.data 存在但没有 success 字段，或者 success 为 false
      throw new Error(response.data?.message || '收藏失败')
    }
  } catch (err) {
    console.error('添加收藏失败:', err)
    return false
  }
}

// 移除收藏
const removeFromFavorite = async (stockCode: string): Promise<boolean> => {
  if (!userStore.isLoggedIn) {
    return false
  }

  try {
    const response = await stockAPI.removeFavorite(stockCode)

    // 检查响应结构
    if (response.data && response.data.success) {
      return true
    } else {
      throw new Error(response.data?.message || '取消收藏失败')
    }
  } catch (err) {
    console.error('移除收藏失败:', err)
    return false
  }
}

// 获取股票列表
const fetchStockList = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await stockAPI.getStockList()

    // 检查响应结构
    if (Array.isArray(response.data)) {
      const stocks = response.data.map((stock: StockListItem) => ({
        ...stock,
        isFavorited: false,
      }))

      // 更新store中的股票列表
      stockStore.setStockList(stocks)

      // 同步收藏状态
      syncFavoriteStatus()

      // 默认选择第一只股票
      if (stocks.length > 0) {
        const firstStock = stocks[0]
        if (firstStock) {
          stockStore.setSelectedStock(firstStock)

          if (firstStock?.dm) {
            fetchStockRealTime(firstStock.dm)
          }
        }
      }
    } else {
      throw new Error(response.data?.message || 'API返回数据格式错误')
    }
  } catch (err) {
    error.value = handleError(err)
    console.error('获取股票列表失败:', err)
  } finally {
    loading.value = false
  }
}

// 处理单个股票的收藏状态变化
const handleStockFavoriteChange = async (stock: Stock, newValue: boolean) => {
  if (!userStore.isLoggedIn) {
    return
  }

  // 提取股票代码的前6位数字（后端期望的格式）
  const stockCode = stock.dm.substring(0, 6)
  let success = false

  if (newValue) {
    // 添加收藏
    success = await addToFavorite(stockCode)
    console.log('添加收藏>>>>>>>>>>>>>>>>>>')
  } else {
    // 移除收藏
    success = await removeFromFavorite(stockCode)
    console.log('移除收藏>>>>>>>>>>>>>>>>>>')
  }

  if (success) {
    stock.isFavorited = newValue

    // 更新收藏列表
    if (newValue) {
      // 添加到收藏列表（比较前6位数字）
      if (!favoriteList.value.some((s) => s.dm.substring(0, 6) === stockCode)) {
        favoriteList.value.push({ ...stock, isFavorited: true })
      }
    } else {
      // 从收藏列表中移除（比较前6位数字）
      favoriteList.value = favoriteList.value.filter((s) => s.dm.substring(0, 6) !== stockCode)
    }

    // 如果是当前选中的股票，更新收藏状态
    if (beShowStock.value?.dm === stock.dm) {
      isFavorited.value = newValue
    }
  } else {
    // 操作失败，恢复状态
    stock.isFavorited = !newValue
  }
}

// 获取交易所名称
const getExchangeName = (jys: string) => {
  return jys === 'sh' ? '上证' : '深证'
}

// 错误处理工具函数
const handleError = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message
  } else if (typeof err === 'string') {
    return err
  } else if (typeof err === 'object' && err !== null && 'message' in err) {
    return String(err.message)
  }
  return '发生未知错误'
}

// 提取股票代码的前6位数字
const extractStockCode = (code: string): string => {
  if (code.length >= 6) {
    return code.substring(0, 6)
  }
  const digits = code.match(/\d/g)
  if (digits) {
    const digitStr = digits.join('')
    return digitStr.substring(0, 6)
  }
  return code
}

// 格式化数字（添加千分位分隔符），如果值不存在返回'--'
const formatNumber = (num: number, decimals: number = 2): string => {
  if (num === undefined || num === null || isNaN(num)) return '--'
  return num.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// 获取显示值，如果值不存在返回'--'
const getDisplayValue = (value: number, decimals: number = 2): string => {
  if (value === undefined || value === null || isNaN(value)) return '--'
  return formatNumber(value, decimals)
}

// 格式化成交量（转换为万/亿单位），如果值不存在返回'--'
const formatVolume = (volume: number): string => {
  if (!volume || isNaN(volume)) return '--'
  if (volume >= 100000000) {
    return (volume / 100000000).toFixed(2) + '亿'
  } else if (volume >= 10000) {
    return (volume / 10000).toFixed(2) + '万'
  }
  return formatNumber(volume, 0)
}

// 格式化成交额（转换为万/亿单位），如果值不存在返回'--'
const formatAmount = (amount: number): string => {
  if (!amount || isNaN(amount)) return '--'
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(2) + '亿元'
  } else if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '万元'
  }
  return formatNumber(amount, 2) + '元'
}

// 计算涨跌幅颜色
const getChangeColor = (value: number): string => {
  if (value === undefined || value === null || isNaN(value)) return ''
  if (value > 0) return 'up-color'
  if (value < 0) return 'down-color'
  return ''
}

// 根据计算值判断颜色
const getComputedChangeColor = (type: 'amount' | 'percent'): string => {
  if (!realTimeData.value?.p || !realTimeData.value?.yc || 
      isNaN(realTimeData.value.p) || isNaN(realTimeData.value.yc)) return ''
  
  const changeAmount = realTimeData.value.p - realTimeData.value.yc
  const changePercentage = realTimeData.value.yc === 0 ? 0 : 
    ((realTimeData.value.p - realTimeData.value.yc) / realTimeData.value.yc) * 100
  
  const value = type === 'amount' ? changeAmount : changePercentage
  
  if (value > 0) return 'up-color'
  if (value < 0) return 'down-color'
  return ''
}

// 获取涨跌额显示
const getChangeAmount = computed(() => {
  if (!realTimeData.value?.p || !realTimeData.value?.yc || 
      isNaN(realTimeData.value.p) || isNaN(realTimeData.value.yc)) return '--'
  
  // 计算涨跌额：当前价格 - 昨收价
  const changeAmount = realTimeData.value.p - realTimeData.value.yc
  if (changeAmount > 0) return `+${changeAmount.toFixed(2)}`
  if (changeAmount < 0) return changeAmount.toFixed(2)
  return '0.00'
})

// 获取涨跌幅显示
const getChangePercentage = computed(() => {
  if (!realTimeData.value?.p || !realTimeData.value?.yc || 
      isNaN(realTimeData.value.p) || isNaN(realTimeData.value.yc) || 
      realTimeData.value.yc === 0) return '--'
  
  // 计算涨跌幅：(当前价格 - 昨收价) / 昨收价 * 100%
  const changePercentage = ((realTimeData.value.p - realTimeData.value.yc) / realTimeData.value.yc) * 100
  if (changePercentage > 0) return `+${changePercentage.toFixed(2)}%`
  if (changePercentage < 0) return `${changePercentage.toFixed(2)}%`
  return '0.00%'
})

// 获取更新时间
const getUpdateTime = computed(() => {
  if (!realTimeData.value?.t) return '--'
  return realTimeData.value.t
})

// 计算换手率
const getTurnoverRate = computed(() => {
  if (!realTimeData.value?.tr || isNaN(realTimeData.value.tr)) return '--'
  return realTimeData.value.tr.toFixed(2) + '%'
})

// 计算振幅
const getAmplitude = computed(() => {
  if (
    !realTimeData.value ||
    !realTimeData.value.yc ||
    !realTimeData.value.h ||
    !realTimeData.value.l
  )
    return '--'
  if (isNaN(realTimeData.value.yc) || isNaN(realTimeData.value.h) || isNaN(realTimeData.value.l))
    return '--'
  if (realTimeData.value.yc === 0) return '--'

  const amplitude = ((realTimeData.value.h - realTimeData.value.l) / realTimeData.value.yc) * 100
  return amplitude.toFixed(2) + '%'
})

// 量比颜色判断
const getVolumeRatioColor = (pv: number) => {
  if (!pv || isNaN(pv)) return ''
  if (pv > 1.5) return 'up-color'
  if (pv < 0.5) return 'down-color'
  return ''
}

// 市盈率颜色判断
const getPERatioColor = (pe: number) => {
  if (!pe || isNaN(pe)) return ''
  if (pe > 30) return 'down-color'
  if (pe < 15) return 'up-color'
  return ''
}

// 市净率颜色判断
const getPBRatioColor = (pb: number) => {
  if (!pb || isNaN(pb)) return ''
  if (pb > 3) return 'down-color'
  if (pb < 1) return 'up-color'
  return ''
}

// 获取股票实时数据
const fetchStockRealTime = async (stockCode?: string) => {
  const code = stockCode || beShowStock.value?.dm

  if (!code) {
    realTimeError.value = '没有可用的股票代码'
    console.log('没有可用的股票代码')
    return
  }

  if (!baUsedLicense) {
    realTimeError.value = '许可证不可用'
    console.log('许可证不可用')
    return
  }

  loadingRealTime.value = true
  realTimeError.value = ''

  const processedCode = extractStockCode(code)
  try {
    const response = await stockAPI.getStockRealTime(processedCode, baUsedLicense)

    if (response.data) {
      const data = response.data

      const stockData: StockRealTimeData = {
        pe: data.pe || 0,
        ud: data.ud || 0,
        pc: data.pc || 0,
        zf: data.zf || 0,
        tr: data.tr || 0,
        pb_ratio: data.pb_ratio || 0,
        p: data.p || 0,
        o: data.o || 0,
        h: data.h || 0,
        l: data.l || 0,
        yc: data.yc || 0,
        cje: data.cje || 0,
        v: data.v || 0,
        pv: data.pv || 0,
        tv: data.tv || 0,
        t: data.t || '',
      }

      realTimeData.value = stockData
    } else {
      throw new Error('API返回数据为空')
    }
  } catch (err) {
    realTimeError.value = handleError(err)
    console.error('获取股票实时数据失败:', err)
  } finally {
    loadingRealTime.value = false
  }
}

// 监听股票选择变化
const selectStock = (stock: Stock) => {
  // 更新全局store
  stockStore.setSelectedStock(stock)

  isFavorited.value = stock.isFavorited || false

  if (stock.dm) {
    fetchStockRealTime(stock.dm)
  }
}

// 监听用户登录状态变化
watch(
  () => userStore.isLoggedIn,
  (isLoggedIn) => {
    if (isLoggedIn) {
      // 用户登录，获取收藏列表
      fetchFavoriteList()
    } else {
      // 用户登出，清空收藏列表
      favoriteList.value = []
      // 重置所有股票的收藏状态
      const currentStockList = stockStore.stockList
      const updatedStockList = currentStockList.map((stock) => ({
        ...stock,
        isFavorited: false,
      }))
      stockStore.setStockList(updatedStockList)

      if (beShowStock.value) {
        const updatedSelectedStock = {
          ...beShowStock.value,
          isFavorited: false,
        }
        stockStore.setSelectedStock(updatedSelectedStock)
      }
      isFavorited.value = false
    }
  },
)

// 导航到仪表盘
const goToDashboard = () => {
  router.push('/dashboard')
  console.log('')
}

// 刷新按钮点击处理
const handleClickRefreshButton = () => {
  stockStore.setStockList([])
  loading.value = false
  error.value = ''
  fetchStockList()
}

onMounted(() => {
  fetchStockList()
  if (userStore.isLoggedIn) {
    fetchFavoriteList()
  }
})
</script>

<style scoped>
.stock-container {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
}

.layout-container {
  display: flex;
  gap: 10px;
  height: 100%;
}

/* 左边：实时数据展示区 */
.real-time-display {
  flex: 3;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

/* 右边：股票列表 */
.simple-stock-list {
  flex: 2;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-height: calc(100vh - 100px);
}

/* 股票列表样式 */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e8f4ff;
}

.title-text {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.refresh-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
}

.refresh-button:hover {
  transform: rotate(90deg);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.5);
}

.refresh-button img {
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
}

.stock-container-list {
  height: 90%;
  overflow-y: auto;
  padding-right: 10px;
}

.stock-container-list::-webkit-scrollbar {
  width: 6px;
}

.stock-container-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.stock-container-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.stock-container-list::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

.stock-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stock-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f4f8;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin-bottom: 8px;
  background: #f8fafc;
}

.stock-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.stock-item.active {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
}

.stock-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: #fff;
  opacity: 0.5;
}

.stock-item:hover .stock-code,
.stock-item.active .stock-code {
  color: white;
  font-weight: 600;
}

.stock-item:hover .stock-name,
.stock-item.active .stock-name {
  color: white;
  font-weight: 500;
}

.stock-item:hover .stock-exchange,
.stock-item.active .stock-exchange {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.stock-code {
  flex: 0 0 100px;
  color: #667eea;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  transition: all 0.3s ease;
}

.stock-name {
  flex: 1;
  color: #333;
  font-size: 15px;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 15px;
}

.stock-exchange {
  flex: 0 0 60px;
  background: #e8f4ff;
  color: #0066cc;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #c3d9ff;
}

/* 以下是实时数据的样式，与你的股票列表样式保持协调 */
.stock-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
}

.stock-title h2 {
  margin: 0 0 12px 0;
  color: #1a1a1a;
  font-size: 28px;
  font-weight: 600;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stock-code {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #666;
  font-size: 18px;
}

.exchange {
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
}

.code {
  font-weight: 700;
  color: #333;
  font-size: 20px;
  font-family: 'Courier New', monospace;
}

/* 主行情样式 */
.main-quote {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f4f8;
}

.current-price {
  font-size: 56px;
  font-weight: 700;
  color: #1a1a1a;
  font-family: 'Arial', sans-serif;
}

.current-price.up-color {
  color: #e74c3c;
  animation: pulse 1.5s infinite;
}

.current-price.down-color {
  color: #2ecc71;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.change-info {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.change-amount,
.change-percent {
  text-align: center;
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 120px;
}

.change-amount {
  font-size: 24px;
  font-weight: 600;
}

.change-percent {
  font-size: 18px;
  font-weight: 600;
}

.change-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
}

.change-value {
  font-family: 'Courier New', monospace;
}

.up-color {
  color: #e74c3c;
  background: linear-gradient(45deg, rgba(231, 76, 60, 0.1), transparent);
  padding: 4px 12px;
  border-radius: 8px;
}

.down-color {
  color: #2ecc71;
  background: linear-gradient(45deg, rgba(46, 204, 113, 0.1), transparent);
  padding: 4px 12px;
  border-radius: 8px;
}

/* 关键指标 */
.key-metrics {
  margin-bottom: 20px;
}

.metric-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.metric-item {
  background: #f8fafc;
  padding: 15px;
  border-radius: 10px;
  border-left: 4px solid #4facfe;
  transition: all 0.3s ease;
}

.metric-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.metric-item .label {
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.metric-item .value {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

/* 成交量区域 */
.volume-section {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  color: white;
}

.volume-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.volume-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.volume-item .label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  opacity: 0.9;
  font-weight: 500;
}

.volume-item .value.highlight {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: white;
}

/* 数据网格 */
.data-grid {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.grid-row:last-child {
  margin-bottom: 0;
}

.grid-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.grid-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.grid-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
}

.grid-item.double {
  grid-column: span 2;
}

.item-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.item-value {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  font-family: 'Courier New', monospace;
}

.item-value.time {
  color: #667eea;
  font-size: 16px;
  font-weight: 500;
}

/* 加载状态 */
.loading-container,
.error-container,
.no-data {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.error-icon,
.no-data-icon {
  font-size: 48px;
  margin-bottom: 20px;
  opacity: 0.7;
}

.error-message {
  color: #e74c3c;
  font-size: 16px;
  font-weight: 500;
}

.no-data p {
  color: #666;
  font-size: 18px;
  font-weight: 500;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .layout-container {
    flex-direction: column;
  }

  .real-time-display,
  .simple-stock-list {
    max-height: none;
  }

  .simple-stock-list {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .stock-container {
    padding: 10px;
  }

  .real-time-display {
    padding: 20px;
  }

  .simple-stock-list {
    padding: 15px;
  }

  .current-price {
    font-size: 40px;
  }

  .change-info {
    flex-direction: row;
    gap: 8px;
    justify-content: flex-end;
  }

  .change-amount,
  .change-percent {
    min-width: 100px;
    padding: 6px 12px;
  }

  .change-amount {
    font-size: 18px;
  }

  .change-percent {
    font-size: 16px;
  }

  .change-label {
    font-size: 11px;
  }

  .metric-row,
  .grid-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .volume-row {
    grid-template-columns: 1fr;
  }

  .grid-item.double {
    grid-column: span 2;
  }

  .stock-item {
    padding: 12px 15px;
  }

  .stock-code {
    flex: 0 0 80px;
    font-size: 14px;
  }

  .stock-name {
    font-size: 14px;
  }

  .stock-exchange {
    flex: 0 0 50px;
    font-size: 11px;
    padding: 4px 8px;
  }
}
.button-container {
  display: flex;
  width: 40%;
  /* 子元素水平排列 */
  flex-direction: row;
  /* 左右组件分别靠左和靠右 */
  justify-content: space-between;
}

.historical-time-sharing-trading-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  background-color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  outline: none;
  user-select: none;
  width: 148px;
  height: 48px;
}
.historical-time-sharing-trading-button.rounded.medium {
  width: 48px;
  height: 48px;
}

.historical-time-sharing-trading-button.rounded.large {
  width: 60px;
  height: 60px;
}
.historical-time-sharing-trading-button :hover:not(.disabled) {
  border-color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.historical-time-sharing-trading-button :active:not(.disabled) {
  transform: translateY(0);
}

.historical-time-sharing-trading-button:hover:not(.disabled) {
  border-color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.historical-time-sharing-trading-button:active:not(.disabled) {
  transform: translateY(0);
}

.historical-time-sharing-trading-button.small {
  padding: 6px 12px;
  font-size: 12px;
}

.historical-time-sharing-trading-button.medium {
  padding: 8px 16px;
  font-size: 14px;
}

.historical-time-sharing-trading-button.large {
  padding: 12px 24px;
  font-size: 16px;
}

.historical-time-sharing-trading-button.rounded {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 0;
}

.historical-time-sharing-trading-button.rounded.small {
  width: 36px;
  height: 36px;
}

.historical-time-sharing-trading-button.rounded.medium {
  width: 48px;
  height: 48px;
}

.historical-time-sharing-trading-button.rounded.large {
  width: 60px;
  height: 60px;
}

.historical-time-sharing-trading-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.historical-time-sharing-trading-button.disabled:hover {
  border-color: #e0e0e0;
  transform: none;
  box-shadow: none;
}
</style>
