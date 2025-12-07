<template>
  <div class="favorites-page">
    <div class="favorites-container">
      <!-- 页面头部 -->
      <div class="favorites-header">
        <h1>我的收藏</h1>
        <p class="favorites-description">查看您关注的股票实时行情</p>
      </div>

      <!-- 未登录状态 -->
      <div v-if="!userStore.isLoggedIn" class="empty-state">
        <div class="empty-icon">💼</div>
        <h2>请先登录</h2>
        <p>登录后即可查看和管理您的股票收藏</p>
        <router-link to="/login" class="login-btn"> 立即登录 </router-link>
      </div>

      <!-- 已登录但无收藏 -->
      <div v-else-if="!loading && filteredFavorites.length === 0" class="empty-state">
        <div class="empty-icon">📈</div>
        <h2>暂无收藏</h2>
        <p>快去添加您关注的股票吧</p>
        <router-link to="/" class="browse-btn"> 浏览股票 </router-link>
      </div>

      <!-- 收藏列表 -->
      <div v-else class="favorites-content">
        <!-- 统计信息 -->
        <div class="stats-bar">
          <div class="stats-info">
            <span class="total-count">
              共收藏 <strong>{{ filteredFavorites.length }}</strong> 只股票
            </span>
            <span v-if="lastUpdateTime" class="update-time">
              更新时间: {{ formatTime(lastUpdateTime) }}
            </span>
          </div>
          <div class="actions">
            <button @click="refreshFavorites" class="refresh-btn" :disabled="loading">
              <span v-if="!loading">🔄 刷新</span>
              <span v-else>加载中...</span>
            </button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>正在加载收藏列表...</p>
        </div>

        <!-- 股票列表 -->
        <div v-else class="favorites-list">
          <div
            v-for="stock in filteredFavorites"
            :key="stock.dm"
            class="stock-card"
            @click="selectStock(stock)"
          >
            <!-- 股票基本信息 -->
            <div class="stock-info">
              <div class="stock-header">
                <div class="stock-name-section">
                  <h3 class="stock-name">{{ stock.mc }}</h3>
                  <span class="stock-code">{{ stock.dm }}</span>
                </div>
                <button
                  @click.stop="toggleFavorite(stock)"
                  class="favorite-btn favorited"
                  title="取消收藏"
                >
                  ❤️
                </button>
              </div>

              <div class="market-info">
                <span class="exchange" :class="stock.jys">
                  {{ getExchangeName(stock.jys) }}
                </span>
              </div>
            </div>

            <!-- 价格信息（如果有实时数据） -->
            <div v-if="stock.realTimeData" class="price-info">
              <div class="current-price">
                <span class="price">{{ formatPrice(stock.realTimeData.p) }}</span>
                <span
                  class="change"
                  :class="getPriceChangeClass(stock.realTimeData.ud, stock.realTimeData.pc)"
                >
                  {{ formatChange(stock.realTimeData.ud, stock.realTimeData.pc) }}
                </span>
              </div>
              <div class="price-details">
                <span class="detail-item"> 开盘: {{ formatPrice(stock.realTimeData.o) }} </span>
                <span class="detail-item"> 最高: {{ formatPrice(stock.realTimeData.h) }} </span>
                <span class="detail-item"> 最低: {{ formatPrice(stock.realTimeData.l) }} </span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="stock-actions">
              <button @click.stop="viewDetails(stock)" class="detail-btn">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作确认弹窗 -->
    <div v-if="showConfirmDialog" class="confirm-modal" @click="showConfirmDialog = false">
      <div class="confirm-dialog" @click.stop>
        <h3>{{ confirmDialog.title }}</h3>
        <p>{{ confirmDialog.message }}</p>
        <div class="confirm-actions">
          <button @click="showConfirmDialog = false" class="cancel-btn">取消</button>
          <button @click="confirmAction" class="confirm-btn">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useStockStore } from '@/stores/stock'
import { stockAPI } from '@/utils/api'
import type { StockWithFavorite } from '@/stores/stock'
import type { StockRealTimeData } from '@/types/api'

const router = useRouter()
const userStore = useUserStore()
const stockStore = useStockStore()

// 响应式数据
const loading = ref(true)
const favoriteStocks = ref<string[]>([])
const stocksWithData = ref<(StockWithFavorite & { realTimeData?: StockRealTimeData })[]>([])
const lastUpdateTime = ref<Date | null>(null)
const showConfirmDialog = ref(false)
const confirmDialog = ref({
  title: '',
  message: '',
  action: '',
  stockCode: '',
})

// 计算属性
const filteredFavorites = computed(() => {
  return stocksWithData.value.filter((stock) =>
    favoriteStocks.value.some((favCode) => {
      // 提取外部API股票代码的前6位数字进行比较
      const stockCodePrefix = stock.dm.substring(0, 6)
      return stockCodePrefix === favCode
    }),
  )
})

// 方法
const getExchangeName = (jys: string) => {
  switch (jys) {
    case 'SZSE':
      return '深交所'
    case 'SSE':
      return '上交所'
    default:
      return jys
  }
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}

const formatChange = (ud: number, pc: number) => {
  const changePercent = (((ud - pc) / pc) * 100).toFixed(2)
  return `${ud >= pc ? '+' : ''}${changePercent}%`
}

const getPriceChangeClass = (ud: number, pc: number) => {
  return ud >= pc ? 'positive' : 'negative'
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// 加载收藏列表
const loadFavorites = async () => {
  if (!userStore.isLoggedIn) {
    loading.value = false
    return
  }

  try {
    loading.value = true
    console.log('开始加载收藏列表...')

    // 并行请求收藏列表和股票列表
    const [favoritesResponse, stockListResponse] = await Promise.all([
      stockAPI.getFavorites(),
      stockAPI.getStockList(),
    ])

    console.log('收藏API响应:', favoritesResponse.data)
    console.log('股票列表API响应:', stockListResponse.data)

    // 处理收藏列表
    if (favoritesResponse.data?.success) {
      const favorites = favoritesResponse.data.data?.favorites || []
      console.log('获取到的收藏数据:', favorites)
      favoriteStocks.value = favorites.map(
        (fav: { stockCode: string; createdAt: string }) => fav.stockCode,
      )
      console.log('提取的股票代码:', favoriteStocks.value)
    } else {
      console.error('收藏API失败:', favoritesResponse.data?.message)
    }

    // 处理股票列表 - 外部API响应结构不同
    if (stockListResponse.data) {
      // 外部API直接返回数组或包含stocks字段的数据
      let stocks = []
      if (Array.isArray(stockListResponse.data)) {
        stocks = stockListResponse.data
      } else if (stockListResponse.data.stocks && Array.isArray(stockListResponse.data.stocks)) {
        stocks = stockListResponse.data.stocks
      }
      
      console.log('获取到的股票列表数量:', stocks.length)
      stockStore.setStockList(stocks)
      stocksWithData.value = stocks
    } else {
      console.error('股票列表API失败: 响应数据为空')
    }

    console.log('过滤后的收藏股票数量:', filteredFavorites.value.length)

    // 为收藏的股票获取实时数据
    if (filteredFavorites.value.length > 0) {
      await loadRealTimeData()
    }

    lastUpdateTime.value = new Date()
  } catch (error) {
    console.error('加载收藏列表失败:', error)
    
    // 类型安全的错误处理
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    
    // 定义API错误接口
    interface ApiError {
      response?: {
        data?: {
          success?: boolean
          message?: string
          error?: string
        }
      }
    }
    
    const errorResponse = (error as ApiError)?.response?.data || null
    
    console.error('错误详情:', errorMessage, errorResponse)
  } finally {
    loading.value = false
  }
}

// 加载实时数据
const loadRealTimeData = async () => {
  try {
    // 为每只收藏的股票获取实时数据
    const realTimePromises = filteredFavorites.value.map(async (stock) => {
      try {
        const response = await stockAPI.getStockRealTime(stock.dm, 'LICENCE-66D8-9F96-0C7F0FBCD073')
        if (response.data?.success) {
          stock.realTimeData = response.data.data
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误'
        console.error(`获取股票 ${stock.dm} 实时数据失败:`, errorMessage)
      }
    })

    await Promise.all(realTimePromises)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error('加载实时数据失败:', errorMessage)
  }
}

// 刷新收藏列表
const refreshFavorites = async () => {
  await loadFavorites()
}

// 选择股票
const selectStock = (stock: StockWithFavorite & { realTimeData?: StockRealTimeData }) => {
  stockStore.setSelectedStock(stock)
  router.push('/dashboard')
}

// 查看详情
const viewDetails = (stock: StockWithFavorite & { realTimeData?: StockRealTimeData }) => {
  stockStore.setSelectedStock(stock)
  router.push('/dashboard')
}

// 切换收藏状态
const toggleFavorite = (stock: StockWithFavorite) => {
  const stockCode = stock.dm.substring(0, 6) // 提取前6位数字

  confirmDialog.value = {
    title: '取消收藏',
    message: `确定要取消收藏 "${stock.mc}" 吗？`,
    action: 'remove',
    stockCode,
  }
  showConfirmDialog.value = true
}

// 确认操作
const confirmAction = async () => {
  const { action, stockCode } = confirmDialog.value

  try {
    if (action === 'remove') {
      await stockAPI.removeFavorite(stockCode)
      // 从收藏列表中移除
      const index = favoriteStocks.value.indexOf(stockCode)
      if (index > -1) {
        favoriteStocks.value.splice(index, 1)
      }
    }

    showConfirmDialog.value = false
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    console.error('操作失败:', errorMessage)
    alert('操作失败，请重试')
  }
}

// 页面初始化
onMounted(() => {
  // 如果没有股票列表，先加载
  if (stockStore.stockList.length === 0) {
    stockAPI.getStockList().then((response) => {
      if (response.data) {
        // 外部API直接返回数组或包含stocks字段的数据
        let stocks = []
        if (Array.isArray(response.data)) {
          stocks = response.data
        } else if (response.data.stocks && Array.isArray(response.data.stocks)) {
          stocks = response.data.stocks
        }
        
        stockStore.setStockList(stocks)
        stocksWithData.value = stocks
        console.log('初始加载股票列表数量:', stocks.length)
      } else {
        console.error('初始股票列表API失败: 响应数据为空')
      }
    }).catch((error) => {
      console.error('初始股票列表API调用失败:', error)
    })
  } else {
    stocksWithData.value = stockStore.stockList
  }

  // 加载收藏列表
  loadFavorites()
})
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: transparent;
  padding: 20px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
}

.favorites-header {
  text-align: center;
  margin-bottom: 40px;
}

.favorites-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.favorites-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-state h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}

.login-btn,
.browse-btn {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.login-btn:hover,
.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
}

/* 内容区域 */
.favorites-content {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 统计栏 */
.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f4f8;
}

.stats-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-count {
  font-size: 16px;
  color: #1a1a1a;
}

.update-time {
  font-size: 12px;
  color: #666;
}

.refresh-btn {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 加载状态 */
.loading-container {
  text-align: center;
  padding: 60px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 股票列表 */
.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
}

/* 自定义滚动条 */
.favorites-list::-webkit-scrollbar {
  width: 8px;
}

.favorites-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.favorites-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.favorites-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 股票卡片 */
.stock-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.stock-card:hover {
  border-color: #4f46e5;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.15);
  transform: translateY(-2px);
}

.stock-info {
  margin-bottom: 16px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.stock-name-section {
  flex: 1;
}

.stock-name {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.stock-code {
  font-size: 14px;
  color: #666;
  font-family: 'Monaco', 'Consolas', monospace;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.favorite-btn.favorited {
  color: #ef4444;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.market-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.exchange {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.exchange.SZSE {
  background: #dbeafe;
  color: #1d4ed8;
}

.exchange.SSE {
  background: #fef3c7;
  color: #d97706;
}

/* 价格信息 */
.price-info {
  margin-bottom: 16px;
  padding: 12px;
  background: white;
  border-radius: 8px;
}

.current-price {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.change {
  font-size: 14px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.change.positive {
  color: #dc2626;
  background: #fee2e2;
}

.change.negative {
  color: #16a34a;
  background: #dcfce7;
}

.price-details {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #666;
}

.detail-item {
  white-space: nowrap;
}

/* 操作按钮 */
.stock-actions {
  display: flex;
  gap: 8px;
}

.detail-btn {
  flex: 1;
  padding: 8px 16px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.detail-btn:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

/* 确认弹窗 */
.confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.confirm-dialog h3 {
  font-size: 18px;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.confirm-dialog p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #f3f4f6;
  color: #4b5563;
}

.cancel-btn:hover {
  background: #e5e7eb;
}

.confirm-btn {
  background: #ef4444;
  color: white;
}

.confirm-btn:hover {
  background: #dc2626;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .favorites-page {
    padding: 16px;
  }

  .favorites-content {
    padding: 20px 16px;
  }

  .favorites-list {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .current-price {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .price-details {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
