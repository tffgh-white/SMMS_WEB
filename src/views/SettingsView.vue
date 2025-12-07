<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1>系统设置</h1>
      <p class="settings-description">配置API证书和其他系统参数</p>
    </div>

    <div class="settings-card">
      <div class="settings-section">
        <h2 class="section-title">API证书配置</h2>

        <!-- 使用提示 -->
        <div class="usage-notice">
          <p class="notice-text">
            ⚠️ <strong>重要提示：</strong>免费证书每天有请求次数限制，如果数据请求失败可以尝试更换许可证
          </p>
        </div>

        <!-- 当前证书显示 -->
        <div class="current-license">
          <div class="license-item">
            <label class="license-label">当前使用的证书：</label>
            <div class="license-display">
              <span class="license-code">{{ currentLicense }}</span>
              <span class="license-status" :class="{ active: isLicenseActive }">
                {{ isLicenseActive ? '已激活' : '未激活' }}
              </span>
            </div>
          </div>
        </div>

        <!-- 证书选择列表 -->
        <div class="license-selection">
          <label class="license-label">选择证书：</label>
          <div class="license-options">
            <div
              v-for="(license, key) in licenseList"
              :key="key"
              class="license-option"
              :class="{ 
                selected: selectedLicense === license,
                'test-license': key === 'license0'
              }"
              @click="selectLicense(license)"
            >
              <div class="license-info">
                <span class="license-name">
                  {{ getLicenseName(key) }}
                  <span v-if="key === 'license0'" class="test-badge">测试</span>
                </span>
                <span class="license-value">{{ license }}</span>
              </div>
              <div class="license-radio">
                <div class="radio-circle" :class="{ checked: selectedLicense === license }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 保存按钮 -->
        <div class="settings-actions">
          <button class="save-button" :disabled="!hasChanges || saving" @click="saveSettings">
            <span v-if="!saving">保存设置</span>
            <span v-else class="saving-text">
              <div class="spinner"></div>
              保存中...
            </span>
          </button>

          <button class="reset-button" @click="resetToDefault" :disabled="saving">
            重置为默认
          </button>
        </div>
      </div>
    </div>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="success-toast">
      <div class="success-icon">✓</div>
      <div class="success-message">设置保存成功！</div>
    </div>

    <!-- 错误提示 -->
    <div v-if="showError" class="error-toast">
      <div class="error-icon">✗</div>
      <div class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import { updateUsedLicense } from '@/utils/api'

const settingsStore = useSettingsStore()

// 响应式数据
const selectedLicense = ref<string>('')
const saving = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// 从store获取许可证列表
const licenseList = computed(() => settingsStore.getSelectableLicenseList())

// 计算属性
const isLicenseActive = computed(() => !!settingsStore.currentLicense)
const currentLicense = computed(() => settingsStore.currentLicense)
const hasChanges = computed(() => selectedLicense.value !== currentLicense.value)

// 获取证书名称
const getLicenseName = (key: string): string => {
  const nameMap: { [key: string]: string } = {
    license0: '测试证书（默认）',
    license1: '正式证书1',
    license2: '正式证书2',
  }
  return nameMap[key] || `证书 ${key}`
}

// 选择证书
const selectLicense = (license: string) => {
  selectedLicense.value = license
}

// 保存设置
const saveSettings = async () => {
  if (!hasChanges.value) return

  saving.value = true
  showError.value = false
  showSuccess.value = false

  try {
    // 模拟保存过程
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 更新当前证书到store
    settingsStore.setLicense(selectedLicense.value)

    // 更新全局证书变量
    updateUsedLicense(selectedLicense.value)

    // 显示成功提示
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('设置保存失败:', error)
    errorMessage.value = `保存失败: ${error instanceof Error ? error.message : '未知错误'}`
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 3000)
  } finally {
    saving.value = false
  }
}

// 重置为默认
const resetToDefault = () => {
  settingsStore.resetLicense()
  selectedLicense.value = settingsStore.currentLicense

  // 更新全局证书变量
  updateUsedLicense(settingsStore.currentLicense)

  errorMessage.value = ''
  showError.value = false
}

// 初始化
onMounted(() => {
  // 从store获取当前证书
  selectedLicense.value = settingsStore.currentLicense

  // 同步全局证书变量
  updateUsedLicense(settingsStore.currentLicense)
})
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px 80px 20px;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  height: 100vh;
  box-sizing: border-box;
}

.settings-header {
  text-align: center;
  margin-bottom: 40px;
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.settings-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.settings-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.settings-section {
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f4f8;
}

.usage-notice {
  margin-bottom: 24px;
  padding: 16px 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-left: 4px solid #ef4444;
  border-radius: 8px;
}

.notice-text {
  font-size: 14px;
  line-height: 1.6;
  color: #dc2626;
  margin: 0;
}

.notice-text strong {
  font-weight: 700;
  color: #b91c1c;
}

.current-license {
  margin-bottom: 32px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #4facfe;
}

.license-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.license-label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.license-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.license-code {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  background: white;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.license-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: #f3f4f6;
  color: #666;
}

.license-status.active {
  background: #10b981;
  color: white;
}

.license-selection {
  margin-bottom: 32px;
}

.license-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.license-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #f8fafc;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.license-option:hover {
  border-color: #e0e7ff;
  background: #f0f4ff;
  transform: translateY(-2px);
}

.license-option.selected {
  border-color: #4f46e5;
  background: #e0e7ff;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.license-option.test-license {
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-color: #f59e0b;
}

.license-option.test-license:hover {
  border-color: #d97706;
  background: linear-gradient(135deg, #fde68a 0%, #fef3c7 100%);
}

.license-option.test-license.selected {
  border-color: #d97706;
  background: linear-gradient(135deg, #fcd34d 0%, #fde68a 100%);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25);
}

.test-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #f59e0b;
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 12px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.license-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.license-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.license-value {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  color: #666;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.license-radio {
  position: relative;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio-circle.checked {
  border-color: #4f46e5;
  background: #4f46e5;
}

.radio-circle.checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
}

.settings-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding: 24px 0 40px 0;
  border-top: 1px solid #f0f4f8;
}

.save-button,
.reset-button {
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.save-button {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.save-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.reset-button {
  background: transparent;
  color: #666;
  border: 2px solid #d1d5db;
}

.reset-button:hover:not(:disabled) {
  border-color: #9ca3af;
  color: #4b5563;
  background: #f9fafb;
}

.saving-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.success-toast,
.error-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

.success-toast {
  background: #10b981;
  color: white;
}

.error-toast {
  background: #ef4444;
  color: white;
}

.success-icon,
.error-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

.success-icon {
  background: rgba(255, 255, 255, 0.2);
}

.error-icon {
  background: rgba(255, 255, 255, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 自定义滚动条样式 */
.settings-container::-webkit-scrollbar {
  width: 8px;
}

.settings-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.settings-container::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #cbd5e1, #94a3b8);
  border-radius: 4px;
  transition: background 0.3s ease;
}

.settings-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .settings-container {
    padding: 20px 16px;
  }

  .settings-card {
    padding: 24px 20px;
  }

  .settings-header h1 {
    font-size: 28px;
  }

  .license-option {
    padding: 16px;
  }

  .license-info {
    gap: 2px;
  }

  .license-name {
    font-size: 14px;
  }

  .license-value {
    font-size: 12px;
  }

  .settings-actions {
    flex-direction: column;
  }

  .save-button,
  .reset-button {
    width: 100%;
  }
}
</style>
