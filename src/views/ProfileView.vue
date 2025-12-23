<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- 页面头部 -->
      <div class="profile-header">
        <h1>个人资料</h1>
        <p class="profile-description">查看和编辑您的个人信息</p>
      </div>

      <!-- 用户信息卡片 -->
      <div class="profile-card">
        <!-- 头像区域 -->
        <div class="avatar-section">
          <div class="avatar-container">
            <img :src="userAvatar" :alt="userName" class="user-avatar" @error="handleAvatarError" />
            <div class="avatar-overlay" @click="showAvatarOptions = !showAvatarOptions">
              <span class="camera-icon">📷</span>
            </div>
          </div>
          <h2 class="user-name">{{ userName }}</h2>
          <p class="user-id">ID: {{ userId }}</p>
        </div>

        <!-- 基本信息 -->
        <div class="info-section">
          <h3>基本信息</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>昵称</label>
              <div class="info-value">
                <input
                  v-if="isEditing"
                  v-model="editForm.nickname"
                  type="text"
                  maxlength="6"
                  class="edit-input"
                />
                <span v-else>{{ userStore.userInfo?.nickname || '未设置' }}</span>
              </div>
            </div>

            <div class="info-item">
              <label>登录ID</label>
              <div class="info-value">{{ userStore.userInfo?.loginId || '未设置' }}</div>
            </div>

            <div class="info-item">
              <label>邮箱</label>
              <div class="info-value">
                <input v-if="isEditing" v-model="editForm.email" type="email" class="edit-input" />
                <span v-else>{{ userStore.userInfo?.email || '未设置' }}</span>
              </div>
            </div>

            <div class="info-item">
              <label>注册时间</label>
              <div class="info-value">{{ formattedRegisterTime }}</div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-section">
          <div class="action-buttons">
            <button
              v-if="!isEditing"
              @click="startEditing"
              class="btn btn-primary"
              :disabled="!userStore.isLoggedIn"
            >
              编辑资料
            </button>

            <template v-else>
              <button
                @click="saveProfile"
                class="btn btn-success"
                :disabled="!isFormValid || saving"
              >
                <span v-if="!saving">保存修改</span>
                <span v-else class="saving-text">
                  <div class="spinner"></div>
                  保存中...
                </span>
              </button>
              <button @click="cancelEditing" class="btn btn-secondary" :disabled="saving">
                取消
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- 账户统计 -->
      <div class="stats-card">
        <h3>账户统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ favoriteCount }}</div>
            <div class="stat-label">收藏股票</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">0</div>
            <div class="stat-label">查看次数</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">1</div>
            <div class="stat-label">登录天数</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 头像修改弹窗 -->
    <div v-if="showAvatarOptions" class="avatar-modal" @click="showAvatarOptions = false">
      <div class="avatar-options" @click.stop>
        <h4>更换头像</h4>
        <div class="avatar-input-section">
          <label for="avatar-url">请输入图片链接：</label>
          <input
            id="avatar-url"
            v-model="avatarUrlInput"
            type="url"
            placeholder="https://example.com/avatar.jpg"
            class="avatar-url-input"
            @keyup.enter="applyAvatar"
          />
          <div v-if="avatarUrlInput" class="avatar-preview">
            <img
              :src="avatarUrlInput"
              alt="头像预览"
              @error="handlePreviewError"
              @load="handlePreviewLoad"
            />
            <p v-if="previewError" class="preview-error">{{ previewError }}</p>
          </div>
        </div>
        <div class="avatar-actions">
          <button
            @click="applyAvatar"
            class="btn btn-primary"
            :disabled="!avatarUrlInput || !isUrlValid"
          >
            应用
          </button>
          <button @click="showAvatarOptions = false" class="btn btn-secondary">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { stockAPI, authAPI } from '@/utils/api'

const userStore = useUserStore()

// 编辑状态
const isEditing = ref(false)
const saving = ref(false)
const showAvatarOptions = ref(false)
const avatarUrlInput = ref('')
const previewError = ref('')

// 收藏相关
const favoriteStocks = ref<string[]>([])

// 编辑表单
const editForm = ref({
  nickname: '',
  email: '',
})

// 计算属性
const userName = computed(() => userStore.userInfo?.nickname || userStore.userInfo?.name || '用户')

const userId = computed(() => userStore.userInfo?.id || '未设置')

const userAvatar = computed(() => userStore.userInfo?.avatar || '/src/assets/deimg.png')

const formattedRegisterTime = computed(() => {
  // 这里可以从后端获取注册时间，暂时显示当前时间
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const isFormValid = computed(() => {
  return (
    editForm.value.nickname.trim().length > 0 &&
    editForm.value.email.trim().length > 0 &&
    editForm.value.nickname.length <= 6
  )
})

// 收藏股票数量
const favoriteCount = computed(() => favoriteStocks.value.length)

// 验证URL格式
const isUrlValid = computed(() => {
  if (!avatarUrlInput.value.trim()) return false
  try {
    new URL(avatarUrlInput.value)
    return true
  } catch {
    return false
  }
})

// 方法
const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/src/assets/deimg.png'
}

const startEditing = () => {
  isEditing.value = true
  editForm.value = {
    nickname: userStore.userInfo?.nickname || '',
    email: userStore.userInfo?.email || '',
  }
}

const cancelEditing = () => {
  isEditing.value = false
  editForm.value = { nickname: '', email: '' }
}

const saveProfile = async () => {
  if (!isFormValid.value) return

  saving.value = true

  try {
    // 调用API更新用户信息
    const response = await authAPI.updateProfile({
      nickname: editForm.value.nickname,
    })

    if (response.data?.success) {
      // 更新用户信息到store
      const updatedUserInfo = {
        ...userStore.userInfo!,
        nickname: editForm.value.nickname,
      }

      userStore.login({
        token: userStore.token,
        userInfo: updatedUserInfo,
      })

      isEditing.value = false
      alert('个人资料更新成功！')
    } else {
      throw new Error(response.data?.message || '更新失败')
    }
  } catch (error) {
    console.error('更新个人资料失败:', error)
    alert('更新失败，请重试')
  } finally {
    saving.value = false
  }
}

const handlePreviewError = () => {
  previewError.value = '图片加载失败，请检查链接是否正确'
}

const handlePreviewLoad = () => {
  previewError.value = ''
}

const applyAvatar = async () => {
  if (!isUrlValid.value) {
    alert('请输入有效的图片链接')
    return
  }

  try {
    // 调用API更新头像
    const response = await authAPI.updateProfile({
      avatar: avatarUrlInput.value.trim(),
    })

    if (response.data?.success) {
      // 更新用户信息到store
      const updatedUserInfo = {
        ...userStore.userInfo!,
        avatar: avatarUrlInput.value.trim(),
      }

      userStore.login({
        token: userStore.token,
        userInfo: updatedUserInfo,
      })

      showAvatarOptions.value = false
      avatarUrlInput.value = ''
      previewError.value = ''
      alert('头像更新成功！')
    } else {
      throw new Error(response.data?.message || '更新失败')
    }
  } catch (error) {
    console.error('更新头像失败:', error)
    alert('更新头像失败，请重试')
  }
}

// 页面初始化
onMounted(async () => {
  // 验证和同步用户数据
  userStore.validateAndSyncData()

  // 检查登录状态
  if (!userStore.isLoggedIn) {
    console.log('用户未登录，重定向到登录页')
    window.location.href = '/login'
    return
  }

  // 检查用户信息完整性
  if (!userStore.userInfo) {
    console.log('用户信息缺失，重新登录')
    userStore.logout()
    window.location.href = '/login'
    return
  }

  // 加载收藏数据
  if (userStore.isLoggedIn) {
    try {
      // 调用API获取收藏数据
      const response = await stockAPI.getFavorites()

      console.log('收藏API完整响应:', response)
      console.log('响应数据:', response.data)

      // 根据实际响应结构调整数据提取逻辑
      let favorites = []
      if (response.data?.success && response.data.data?.favorites) {
        // 内部API格式: {success: true, data: {favorites: []}}
        favorites = response.data.data.favorites
      } else if (response.data?.favorites) {
        // 直接包含favorites字段
        favorites = response.data.favorites
      } else if (Array.isArray(response.data)) {
        // 直接返回数组
        favorites = response.data
      }

      favoriteStocks.value = favorites.map(
        (fav: { stockCode: string }) => fav.stockCode,
      )
      console.log('提取的股票代码:', favoriteStocks.value)
      console.log('收藏数量:', favoriteStocks.value.length)
    } catch (error) {
      console.error('加载收藏数据失败:', error)
    }
  }

  console.log('个人资料页面加载成功，用户信息:', userStore.userInfo)
})
</script>

<style scoped>
.profile-page {
  min-height: 90vh;
  height: 90vh;
  background: transparent;
  padding: 20px;
  padding-bottom: 40px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 40px;
}

.profile-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.profile-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 40px;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f4f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.avatar-overlay {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 36px;
  height: 36px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid white;
  transition: all 0.3s ease;
}

.avatar-overlay:hover {
  background: #4338ca;
  transform: scale(1.1);
}

.camera-icon {
  font-size: 16px;
  color: white;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.user-id {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.info-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f4f8;
}

.info-grid {
  display: grid;
  gap: 20px;
}

.info-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f4f8;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.info-value {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.edit-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.action-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #f0f4f8;
}

.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-secondary {
  background: transparent;
  color: #666;
  border: 2px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  border-color: #9ca3af;
  color: #4b5563;
  background: #f9fafb;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.saving-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid white;
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

.stats-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f4f8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 24px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #4f46e5;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

/* 头像修改弹窗 */
.avatar-modal {
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

.avatar-options {
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.avatar-options h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 24px;
  text-align: center;
}

.avatar-input-section {
  margin-bottom: 24px;
}

.avatar-input-section label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 8px;
}

.avatar-url-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.avatar-url-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.avatar-url-input::placeholder {
  color: #9ca3af;
}

.avatar-preview {
  margin-top: 16px;
  text-align: center;
}

.avatar-preview img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-error {
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px 12px;
  background: #fef2f2;
  border-radius: 6px;
  border: 1px solid #fecaca;
}

.avatar-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-page {
    padding: 16px;
  }

  .profile-card {
    padding: 24px 20px;
  }

  .info-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .info-item label {
    font-weight: 600;
    color: #4b5563;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .avatar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
