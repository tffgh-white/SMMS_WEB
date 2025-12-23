<template>
  <div class="dashboard-view">
    <div class="page-header">
      <h1>股票分析仪表板</h1>
      <p class="page-description">基于实时数据的股票走势分析，提供K线图、成交量等技术指标</p>
    </div>

    <div class="dashboard-content">
      <div class="chart-container">
        <div class="chart-header">
          <h2>
            {{ stockStore.selectedStockCode }} {{ stockStore.selectedStockInfo.name }} - K线图
          </h2>
          <div class="chart-controls">
            <button @click="refreshData" :disabled="loading" class="refresh-btn">
              {{ loading ? '加载中...' : '刷新数据' }}
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>正在加载数据...</p>
        </div>

        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="loadData" class="retry-btn">重试</button>
        </div>

        <div v-else class="chart-wrapper">
          <v-chart :option="chartOption" :style="{ height: '450px', width: '100%' }" autoresize />
        </div>
      </div>

      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-title">最新价格</div>
            <div class="stat-value">{{ latestPrice }}</div>
            <div
              class="stat-change"
              :class="{ positive: priceChange > 0, negative: priceChange < 0 }"
            >
              {{ priceChangeText }}
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-title">成交量</div>
            <div class="stat-value">{{ formatVolume(latestVolume) }}</div>
            <div class="stat-desc">股</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">成交额</div>
            <div class="stat-value">{{ formatAmount(latestAmount) }}</div>
            <div class="stat-desc">元</div>
          </div>

          <div class="stat-card">
            <div class="stat-title">涨跌幅</div>
            <div
              class="stat-value"
              :class="{ positive: percentChange > 0, negative: percentChange < 0 }"
            >
              {{ percentChangeText }}
            </div>
            <div class="stat-desc">百分比</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import VChart from 'vue-echarts'
import { useStockStore } from '@/stores/stock'
import { use } from 'echarts/core'
import { CandlestickChart, LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
  MarkLineComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'
import type { StockHistoryData } from '@/types/api'
import { stockAPI } from '@/utils/api'

// 注册 ECharts 组件
use([
  CandlestickChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
  CanvasRenderer,
  MarkLineComponent,
])

// 响应式数据
// 全局store
const stockStore = useStockStore()

const loading = ref(false)
const error = ref<string>('')
const stockData = ref<StockHistoryData[]>([])

// 计算属性
const latestPrice = computed(() => {
  if (stockData.value.length === 0) return '--'
  const latestItem = stockData.value[stockData.value.length - 1]
  return latestItem?.c?.toFixed(2) ?? '--'
})

const latestVolume = computed(() => {
  if (stockData.value.length === 0) return 0
  const latestItem = stockData.value[stockData.value.length - 1]
  return latestItem?.v ?? 0
})

const latestAmount = computed(() => {
  if (stockData.value.length === 0) return 0
  const latestItem = stockData.value[stockData.value.length - 1]
  return latestItem?.a ?? 0
})

const priceChange = computed(() => {
  if (stockData.value.length < 2) return 0
  const current = stockData.value[stockData.value.length - 1]?.c ?? 0
  const previous = stockData.value[stockData.value.length - 2]?.c ?? 0
  return current - previous
})

const priceChangeText = computed(() => {
  const change = priceChange.value
  if (change === 0) return '0.00'
  return `${change > 0 ? '+' : ''}${change.toFixed(2)}`
})

const percentChange = computed(() => {
  if (stockData.value.length < 2) return 0
  const current = stockData.value[stockData.value.length - 1]?.c ?? 0
  const previous = stockData.value[stockData.value.length - 2]?.c ?? 1
  return ((current - previous) / previous) * 100
})

const percentChangeText = computed(() => {
  const change = percentChange.value
  if (change === 0) return '0.00%'
  return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`
})

// ECharts 配置
const chartOption = computed<EChartsOption>(() => {
  if (stockData.value.length === 0) {
    return {
      title: {
        text: '暂无数据',
        left: 'center',
        top: 'middle',
        textStyle: {
          fontSize: 16,
          color: '#999',
        },
      },
    }
  }

  const klineData = stockData.value.map((item) => [
    item.o ?? 0, // 开盘价
    item.c ?? 0, // 收盘价
    item.l ?? 0, // 最低价
    item.h ?? 0, // 最高价
  ])

  const volumeData = stockData.value.map((item) => {
    const color = (item.c ?? 0) >= (item.o ?? 0) ? '#ef5350' : '#26a69a'
    return {
      value: item.v ?? 0,
      itemStyle: {
        color: color,
      },
    }
  })

  const dates = stockData.value.map((item) => {
    if (!item.t) return '--'

    let date: Date
    try {
      // 尝试直接解析标准格式
      date = new Date(item.t)

      // 如果解析失败，尝试处理可能的YYYYMMDD格式
      if (isNaN(date.getTime())) {
        // 处理可能的YYYYMMDD或YYYYMMDDHHMMSS格式
        const dateStr = item.t.replace(/[^\d]/g, '')
        if (dateStr.length >= 8) {
          const year = dateStr.substring(0, 4)
          const month = dateStr.substring(4, 6)
          const day = dateStr.substring(6, 8)
          date = new Date(`${year}-${month}-${day}`)
        } else {
          return '--'
        }
      }

      if (isNaN(date.getTime())) return '--'

      return `${date.getMonth() + 1}/${date.getDate()}`
    } catch (error) {
      console.error('日期解析错误:', item.t, error)
      return '--'
    }
  })
  return {
    animation: false,
    legend: {
      data: ['K线', '成交量'],
      top: 10,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (params: any) {
        const data = params[0] as { dataIndex: number }
        const stockItem = stockData.value[data.dataIndex]

        if (!stockItem) return ''

        // 格式化显示的日期
        const formatDisplayDate = (dateStr: string) => {
          if (!dateStr) return '--'

          try {
            let date: Date
            date = new Date(dateStr)

            if (isNaN(date.getTime())) {
              const cleanDateStr = dateStr.replace(/[^\d]/g, '')
              if (cleanDateStr.length >= 8) {
                const year = cleanDateStr.substring(0, 4)
                const month = cleanDateStr.substring(4, 6)
                const day = cleanDateStr.substring(6, 8)
                date = new Date(`${year}-${month}-${day}`)
              } else {
                return dateStr
              }
            }

            if (isNaN(date.getTime())) return dateStr

            return date.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          } catch {
            return dateStr
          }
        }

        return `
          <div style="padding: 10px">
            <div style="font-weight: bold; margin-bottom: 5px">${formatDisplayDate(stockItem.t || '--')}</div>
            <div>开盘: ${(stockItem.o || 0).toFixed(2)}</div>
            <div>收盘: ${(stockItem.c || 0).toFixed(2)}</div>
            <div>最高: ${(stockItem.h || 0).toFixed(2)}</div>
            <div>最低: ${(stockItem.l || 0).toFixed(2)}</div>
            <div>成交量: ${formatVolume(stockItem.v || 0)}股</div>
            <div>成交额: ${formatAmount(stockItem.a || 0)}元</div>
          </div>
        `
      },
    },
    grid: [
      {
        left: '10%',
        right: '8%',
        height: '60%',
      },
      {
        left: '10%',
        right: '8%',
        top: '75%',
        height: '20%',
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: dates,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
      {
        type: 'category',
        gridIndex: 1,
        data: dates,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 70,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        top: '92%',
        start: 70,
        end: 100,
      },
    ],
    series: [
      {
        name: 'K线',
        type: 'candlestick',
        data: klineData,
        itemStyle: {
          color: '#ef5350',
          color0: '#26a69a',
          borderColor: '#ef5350',
          borderColor0: '#26a69a',
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
        },
      },
      {
        name: '成交量',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumeData,
        itemStyle: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          color: function (params: any) {
            return params.data.itemStyle.color
          },
        },
      },
    ],
  }
})

// 格式化函数
const formatVolume = (volume: number): string => {
  if (volume >= 100000000) {
    return (volume / 100000000).toFixed(2) + '亿'
  } else if (volume >= 10000) {
    return (volume / 10000).toFixed(2) + '万'
  }
  return volume.toString()
}

const formatAmount = (amount: number): string => {
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(2) + '亿'
  } else if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '万'
  }
  return amount.toString()
}

// 数据加载
// 数据加载
const loadData = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await stockAPI.getHistoryData(stockStore.selectedStockCode)
    console.log('API响应:', response.data)

    if (response.data && Array.isArray(response.data)) {
      stockData.value = response.data
      console.log('股票数据加载成功，数量:', stockData.value.length)
    } else if (response.data && typeof response.data === 'object') {
      // 如果返回的是对象，尝试找到数据数组
      const dataArray = response.data.data || response.data.result || response.data.items || []
      if (Array.isArray(dataArray)) {
        stockData.value = dataArray
        console.log('股票数据加载成功，数量:', stockData.value.length)
      } else {
        console.log('API返回的数据格式不正确:', response.data)
        throw new Error('数据格式不正确')
      }
    } else {
      console.log('API响应中没有有效数据:', response.data)
      throw new Error('没有找到有效数据')
    }
  } catch (err) {
    console.error('加载数据失败:', err)
    error.value = '数据加载失败，请稍后重试'

    // 使用示例数据
    stockData.value = [
      {
        t: '2025-01-02 00:00:00',
        o: 11.73,
        h: 11.77,
        l: 11.39,
        c: 11.43,
        v: 1819597,
        a: 2102923078,
        pc: 11.7,
        sf: 0,
      },
      {
        t: '2025-01-03 00:00:00',
        o: 11.44,
        h: 11.54,
        l: 11.36,
        c: 11.38,
        v: 1154680,
        a: 1320520977,
        pc: 11.43,
        sf: 0,
      },
      {
        t: '2025-01-06 00:00:00',
        o: 11.35,
        h: 11.45,
        l: 11.2,
        c: 11.32,
        v: 1567823,
        a: 1756234567,
        pc: 11.38,
        sf: 0,
      },
      {
        t: '2025-01-07 00:00:00',
        o: 11.38,
        h: 11.52,
        l: 11.25,
        c: 11.48,
        v: 1987654,
        a: 2234567890,
        pc: 11.32,
        sf: 0,
      },
      {
        t: '2025-01-08 00:00:00',
        o: 11.5,
        h: 11.65,
        l: 11.4,
        c: 11.58,
        v: 2345678,
        a: 2678901234,
        pc: 11.48,
        sf: 0,
      },
    ]
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  loadData()
}

// 生命周期
// 监听股票代码变化，自动重新加载数据
watch(
  () => stockStore.selectedStockCode,
  (newCode) => {
    if (newCode) {
      loadData()
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
  background: #f5f5f5;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.page-description {
  margin: 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  min-height: 0;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h2 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.chart-controls {
  display: flex;
  gap: 10px;
}

.refresh-btn {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: #0056b3;
}

.refresh-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #666;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error {
  text-align: center;
  padding: 50px;
  color: #dc3545;
}

.retry-btn {
  margin-top: 15px;
  padding: 8px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.retry-btn:hover {
  background: #218838;
}

.chart-wrapper {
  width: 100%;
  overflow: hidden;
}

.stats-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: center;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 14px;
  margin-bottom: 4px;
}

.stat-change.positive {
  color: #ef5350;
}

.stat-change.negative {
  color: #26a69a;
}

.stat-desc {
  font-size: 12px;
  color: #999;
}

.positive {
  color: #ef5350;
}

.negative {
  color: #26a69a;
}

@media (max-width: 768px) {
  .dashboard-view {
    padding: 15px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-description {
    font-size: 14px;
  }

  .chart-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .stat-card {
    padding: 15px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>
