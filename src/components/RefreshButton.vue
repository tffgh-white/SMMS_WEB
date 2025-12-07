<template>
  <button
    class="refresh-btn"
    :class="{ loading: loading, error: error }"
    @click="handleRefresh"
    :disabled="loading"
    :title="buttonTitle"
  >
    <span class="btn-content">
      <span class="icon" :class="{ spinning: loading }"> 🔄 </span>
      <span class="text">
        {{ buttonText }}
      </span>
    </span>

    <!-- 加载进度指示器 -->
    <span v-if="loading" class="loading-indicator"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义组件属性
interface Props {
  loading?: boolean
  error?: boolean
  size?: 'small' | 'medium' | 'large'
}

// 定义组件事件
interface Emits {
  (e: 'refresh'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: false,
  size: 'medium',
})

const emit = defineEmits<Emits>()

// 计算按钮文本
const buttonText = computed(() => {
  if (props.loading) return '刷新中...'
  if (props.error) return '刷新失败'
  return '刷新数据'
})

// 计算按钮标题（悬停提示）
const buttonTitle = computed(() => {
  if (props.loading) return '正在刷新数据，请稍候...'
  if (props.error) return '点击重试刷新数据'
  return '点击刷新数据'
})

// 处理刷新点击事件
const handleRefresh = () => {
  if (!props.loading) {
    emit('refresh')
  }
}
</script>

<style scoped>
.refresh-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;
  user-select: none;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #f9fafb;
  border-color: #9ca3af;
  transform: translateY(-1px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.refresh-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.refresh-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.refresh-btn.loading {
  cursor: wait;
}

.refresh-btn.error {
  border-color: #ef4444;
  background-color: #fef2f2;
  color: #dc2626;
}

.refresh-btn.error:hover:not(:disabled) {
  background-color: #fee2e2;
  border-color: #ef4444;
}

/* 按钮内容布局 */
.btn-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 图标动画 */
.icon {
  transition: transform 0.3s ease;
}

.icon.spinning {
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

/* 加载指示器 */
.loading-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 0 0 6px 6px;
}

@keyframes loading {
  0% {
    width: 0%;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

/* 尺寸变体 */
.refresh-btn.small {
  padding: 6px 12px;
  font-size: 12px;
}

.refresh-btn.large {
  padding: 10px 20px;
  font-size: 16px;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .refresh-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
