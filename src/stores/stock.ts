// stores/stock.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StockListItem } from '@/types/api'

// 扩展股票接口以支持收藏状态
export interface StockWithFavorite extends StockListItem {
  isFavorited?: boolean
}

export const useStockStore = defineStore('stock', () => {
  // 股票列表
  const stockList = ref<StockWithFavorite[]>([])
  
  // 当前选中的股票（完整信息）
  const selectedStock = ref<StockWithFavorite | null>(null)
  
  // 当前选中的股票代码（向后兼容）
  const selectedStockCode = ref<string>('000001.SZ')
  
  // 当前选中的股票信息（向后兼容）
  const selectedStockInfo = ref<{
    code: string
    name: string
  }>({
    code: '000001.SZ',
    name: '平安银行'
  })

  // 设置股票列表
  const setStockList = (list: StockWithFavorite[]) => {
    stockList.value = list
  }

  // 设置选中的股票（新方法）
  const setSelectedStock = (stock: StockWithFavorite) => {
    selectedStock.value = stock
    selectedStockCode.value = stock.dm
    selectedStockInfo.value = {
      code: stock.dm,
      name: stock.mc
    }
  }

  // 设置选中的股票代码（向后兼容）
  const setSelectedStockCode = (code: string) => {
    selectedStockCode.value = code
  }

  // 设置选中的股票信息（向后兼容）
  const setSelectedStockInfo = (info: { code: string; name: string }) => {
    selectedStockInfo.value = info
    selectedStockCode.value = info.code
  }

  // 重置为默认股票
  const resetToDefaultStock = () => {
    selectedStockCode.value = '000001.SZ'
    selectedStockInfo.value = {
      code: '000001.SZ',
      name: '平安银行'
    }
    // 如果有股票列表，选择第一个
    if (stockList.value.length > 0) {
      const firstStock = stockList.value[0]
      if (firstStock) {
        setSelectedStock(firstStock)
      }
    }
  }

  return {
    stockList,
    selectedStock,
    selectedStockCode,
    selectedStockInfo,
    setStockList,
    setSelectedStock,
    setSelectedStockCode,
    setSelectedStockInfo,
    resetToDefaultStock
  }
})