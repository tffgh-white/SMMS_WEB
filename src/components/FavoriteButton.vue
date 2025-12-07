<template>
  <div class="favorite-container">
    <button
      class="favorite-button"
      :class="{
        favorited: isFavorited,
        disabled: disabled,
        small: size === 'small',
        medium: size === 'medium',
        large: size === 'large',
        'custom-color': customColor,
      }"
      :style="customColorStyle"
      @click="toggleFavorite"
      :disabled="disabled"
      :aria-label="ariaLabel"
      :title="title"
    >
      <div class="icon-wrapper">
        <!-- 心形图标 -->
        <svg
          class="heart-svg"
          :class="{ 'pulse-animation': showPulseAnimation }"
          viewBox="0 0 24 24"
          :width="svgSize"
          :height="svgSize"
        >
          <!-- 心形路径 -->
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            :class="['heart-path', { filled: isFavorited }]"
          />
          <!-- 外部边框 -->
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            class="heart-outline"
            fill="none"
          />
        </svg>

        <!-- 动画粒子效果 -->
        <div v-if="showParticles && isFavorited" class="particles">
          <div
            v-for="particle in particles"
            :key="particle.id"
            class="particle"
            :style="particleStyle(particle)"
          ></div>
        </div>
      </div>

      <!-- 文字标签 -->
      <span v-if="showLabel" class="favorite-label">
        {{ isFavorited ? favoritedText : notFavoritedText }}
      </span>
    </button>

    <!-- 收藏计数 -->
    <div v-if="showCount" class="favorite-count">
      <span class="count-number">{{ formattedCount }}</span>
      <span class="count-label">收藏</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, type CSSProperties } from 'vue'

// 定义组件属性
interface Props {
  // 初始收藏状态
  modelValue?: boolean
  // 收藏数量
  count?: number
  // 尺寸大小
  size?: 'small' | 'medium' | 'large'
  // 是否显示标签文字
  showLabel?: boolean
  // 未收藏时的文字
  notFavoritedText?: string
  // 已收藏时的文字
  favoritedText?: string
  // 是否禁用
  disabled?: boolean
  // 是否显示收藏计数
  showCount?: boolean
  // 是否显示粒子动画
  showParticles?: boolean
  // 自定义颜色
  color?: string
  // 是否使用圆形背景
  rounded?: boolean
  // ARIA标签
  ariaLabel?: string
}

// 默认属性值
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  count: 0,
  size: 'medium',
  showLabel: false,
  notFavoritedText: '收藏',
  favoritedText: '已收藏',
  disabled: false,
  showCount: false,
  showParticles: true,
  color: '',
  rounded: false,
  ariaLabel: '收藏按钮',
})

// 定义事件
interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
  (e: 'favorited'): void
  (e: 'unfavorited'): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const isFavorited = ref(props.modelValue)
const showPulseAnimation = ref(false)
const particles = ref<Array<{ id: number; angle: number; distance: number }>>([])

// 计算属性
const title = computed(() => {
  return isFavorited.value ? '取消收藏' : '点击收藏'
})

const svgSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 20
    case 'large':
      return 28
    default:
      return 24
  }
})

const formattedCount = computed(() => {
  if (props.count >= 10000) {
    return `${(props.count / 10000).toFixed(1)}万`
  } else if (props.count >= 1000) {
    return `${(props.count / 1000).toFixed(1)}千`
  }
  return props.count
})

const customColor = computed(() => !!props.color)
const customColorStyle = computed(() => {
  if (!props.color) return {}

  return {
    '--custom-color': props.color,
    '--custom-color-light': `${props.color}40`,
  } as CSSProperties
})

// 粒子样式
const particleStyle = (particle: { id: number; angle: number; distance: number }) => {
  const rad = particle.angle * (Math.PI / 180)
  const x = Math.cos(rad) * particle.distance
  const y = Math.sin(rad) * particle.distance

  return {
    transform: `translate(${x}px, ${y}px)`,
    opacity: 0,
  }
}

// 切换收藏状态
const toggleFavorite = () => {
  if (props.disabled) return

  const newValue = !isFavorited.value
  isFavorited.value = newValue

  // 触发动画
  if (newValue) {
    triggerPulseAnimation()
    if (props.showParticles) {
      createParticles()
    }
  }

  // 发射事件
  emit('update:modelValue', newValue)
  emit('change', newValue)

  if (newValue) {
    emit('favorited')
  } else {
    emit('unfavorited')
  }
}

// 触发脉冲动画
const triggerPulseAnimation = () => {
  showPulseAnimation.value = true
  setTimeout(() => {
    showPulseAnimation.value = false
  }, 500)
}

// 创建粒子效果
const createParticles = () => {
  const particleCount = 8
  particles.value = []

  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      id: i,
      angle: (360 / particleCount) * i,
      distance: 20 + Math.random() * 15,
    })
  }

  // 清除之前的粒子
  setTimeout(() => {
    particles.value = []
  }, 1000)
}

// 监听外部modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    isFavorited.value = newValue
  },
)

// 组件挂载时初始化
onMounted(() => {
  isFavorited.value = props.modelValue
})
</script>

<style scoped>
.favorite-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.favorite-button {
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
}

.favorite-button:hover:not(.disabled) {
  border-color: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.2);
}

.favorite-button:active:not(.disabled) {
  transform: translateY(0);
}

.favorite-button.small {
  padding: 6px 12px;
  font-size: 12px;
}

.favorite-button.medium {
  padding: 8px 16px;
  font-size: 14px;
}

.favorite-button.large {
  padding: 12px 24px;
  font-size: 16px;
}

.favorite-button.rounded {
  border-radius: 50%;
  width: 48px;
  height: 48px;
  padding: 0;
}

.favorite-button.rounded.small {
  width: 36px;
  height: 36px;
}

.favorite-button.rounded.medium {
  width: 48px;
  height: 48px;
}

.favorite-button.rounded.large {
  width: 60px;
  height: 60px;
}

.favorite-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.favorite-button.disabled:hover {
  border-color: #e0e0e0;
  transform: none;
  box-shadow: none;
}

/* 图标容器 */
.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 心形SVG */
.heart-svg {
  transition: all 0.3s ease;
}

/* 心形路径（填充部分） */
.heart-path {
  fill: #e0e0e0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 心形边框 */
.heart-outline {
  stroke: #e0e0e0;
  stroke-width: 1.5;
  transition: stroke 0.3s ease;
}

/* 收藏状态样式 */
.favorited .heart-path {
  fill: #ff6b6b;
  transform: scale(1.1);
}

.favorited .heart-outline {
  stroke: #ff6b6b;
}

/* 自定义颜色 */
.favorite-button.custom-color.favorited .heart-path {
  fill: var(--custom-color);
}

.favorite-button.custom-color.favorited .heart-outline {
  stroke: var(--custom-color);
}

.favorite-button.custom-color:hover:not(.disabled) {
  border-color: var(--custom-color);
  box-shadow: 0 4px 12px var(--custom-color-light);
}

/* 脉冲动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.pulse-animation {
  animation: pulse 0.5s ease;
}

/* 粒子动画 */
.particles {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ff6b6b;
  animation: particle-fly 1s ease-out forwards;
}

.custom-color .particle {
  background-color: var(--custom-color);
}

@keyframes particle-fly {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: var(--particle-transform) scale(0.5);
  }
}

/* 文字标签 */
.favorite-label {
  font-weight: 500;
  color: #666;
  transition: color 0.3s ease;
}

.favorited .favorite-label {
  color: #ff6b6b;
  font-weight: 600;
}

.custom-color.favorited .favorite-label {
  color: var(--custom-color);
}

/* 收藏计数 */
.favorite-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.count-number {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.count-label {
  font-size: 12px;
  color: #888;
}
</style>
