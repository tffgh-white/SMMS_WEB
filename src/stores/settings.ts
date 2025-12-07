// stores/settings.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
  // 许可证配置
  const licenseList = {
    license0: 'LICENCE-66D8-9F96-0C7F0FBCD073',
    license1: '9AC4BBCB-C1D3-4453-BA13-B5B6886C55B1',
    license2: '23B828AB-CAD1-4939-A7DD-AED8BA4A201D',
  }

  // 安全地从localStorage获取数据
  const safeGetItem = (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error)
      return null
    }
  }

  // 安全地设置localStorage
  const safeSetItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn(`Failed to set ${key} in localStorage:`, error)
    }
  }

  // 当前选中的许可证（默认使用测试证书license0）
  const currentLicense = ref<string>(
    safeGetItem('selectedLicense') || licenseList.license0
  )

  // 设置许可证
  const setLicense = (license: string): void => {
    currentLicense.value = license
    safeSetItem('selectedLicense', license)
  }

  // 重置为默认许可证
  const resetLicense = (): void => {
    setLicense(licenseList.license1)
  }

  // 获取许可证列表
  const getLicenseList = () => licenseList

  // 获取所有可选择的许可证列表（包括测试证书license0）
  const getSelectableLicenseList = () => {
    return licenseList
  }

  return {
    currentLicense,
    licenseList,
    setLicense,
    resetLicense,
    getLicenseList,
    getSelectableLicenseList,
  }
})