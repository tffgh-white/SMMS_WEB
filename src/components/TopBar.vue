<template>
  <nav class="top-navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <div class="logo-section">
        <router-link to="/" class="logo-link">
          <div class="logo">iStock</div>
        </router-link>
      </div>

      <!-- 测试登录 -->
      <div class="testLogin" v-show="false">
        <button @click="testLogin">测试登录</button>
        <button
          @click="userStore.isLoggedIn ? handleLogout() : null"
          :disabled="!userStore.isLoggedIn"
          :class="{ disabled: !userStore.isLoggedIn }"
        >
          测试退出
        </button>
        <button @click="checkStatus">检查状态</button>

        <div v-if="userStore.isLoggedIn">
          欢迎, {{ userStore.userInfo?.nickname || userStore.userInfo?.name || '用户' }}
          <button @click="handleLogout">退出登录</button>
        </div>
        <div v-else>未登录</div>
      </div>

      <!-- 导航链接 -->
      <ul class="nav-links">
        <li v-for="item in navItems" :key="item.id" class="nav-item">
          <router-link
            :to="item.path"
            class="nav-link"
            :class="{ active: activeRoute === item.path }"
          >
            {{ item.text }}
            <span class="link-underline"></span>
          </router-link>
        </li>
      </ul>

      <!-- 注册登录链接-->
      <div v-if="!userStore.isLoggedIn" class="auth-buttons">
        <!-- 登录按钮 -->
        <router-link to="/login" class="nav-link login-btn"> 登录 </router-link>

        <!-- 注册按钮 -->
        <router-link to="/register" class="nav-link register-btn"> 注册 </router-link>
      </div>
      <div v-else class="welcome-div">
        欢迎, {{ userStore.userInfo?.nickname || userStore.userInfo?.name || '用户' }}
      </div>

      <!-- 用户操作区域 -->
      <div class="user-actions">
        <button class="icon-btn search-btn" @click="toggleSearch">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="user-profile">
          <div class="avatar" @click="toggleUserMenu">
            <img v-if="!userStore.isLoggedIn" src="../assets/deimg.png" alt="用户头像" />
            <img
              v-else-if="userStore.userInfo?.avatar"
              :src="userStore.userInfo.avatar"
              alt="用户头像"
              @error="handleAvatarError"
            />
            <img v-else src="https://i.pravatar.cc/150?u=default" alt="默认头像" />
          </div>
          <div class="user-menu" v-if="isUserMenuOpen">
            <div
              class="menu-item"
              :class="{ disabled: !userStore.isLoggedIn }"
              @click="userStore.isLoggedIn ? handleProfile() : null"
            >
              个人资料
            </div>
            <div class="menu-item" @click="handleSettings">设置</div>
            <div
              class="menu-item logout"
              :class="{ disabled: !userStore.isLoggedIn }"
              @click="userStore.isLoggedIn ? handleLogout() : null"
            >
              退出登录
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="search-bar" v-if="showSearch">
      <div class="search-container">
        <input
          type="text"
          placeholder="输入股票代码(6位数字)或名称，按回车搜索..."
          v-model="searchQuery"
          ref="searchInput"
          @keyup.enter="searchStock"
        />
        <button class="close-search" @click="toggleSearch">×</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router' // 确保从 vue-router 导入
import { useUserStore } from '@/stores/user'
import { useStockStore } from '@/stores/stock'
import type { UserInfo } from '@/stores/user'
// 响应式数据
const isScrolled = ref(false)
const isUserMenuOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const userStore = useUserStore()
const stockStore = useStockStore()
// 测试登录
const testLogin = () => {
  const mockUserData: UserInfo = {
    id: 1,
    nickname: '测试用户',
    name: '测试用户',
    email: 'test@example.com',
    avatar: 'https://picsum.photos/seed/testuser/150/150.jpg',
  }
  const loginData = {
    token: 'mock-token-123456',
    userInfo: mockUserData,
  }
  userStore.login(loginData)
  console.log('登录成功:', userStore.userInfo)
}

// 检查状态
const checkStatus = () => {
  console.log('登录状态:', userStore.isLoggedIn)
  console.log('用户信息:', userStore.userInfo)
  console.log('Token:', userStore.token)
}

// 导航菜单项
const navItems = ref([
  { id: 1, text: '首页', path: '/' },
  { id: 2, text: '介绍', path: '/introduction' },
  { id: 3, text: '行情中心', path: '/dashboard' },
  { id: 4, text: '我的收藏', path: '/favorites' },
])

// 获取当前路由
const route = useRoute() // 这是当前路由信息（只读）
const router = useRouter() // 这是路由器实例（用于导航）
// 使用计算属性实时获取当前路由路径
const activeRoute = computed(() => route.path)

// 监听滚动
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

// 切换用户菜单
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 切换搜索栏
const toggleSearch = async () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    isUserMenuOpen.value = false
    searchQuery.value = ''
    // 等待DOM更新后聚焦搜索框
    await nextTick()
    searchInput.value?.focus()
  }
}

// 搜索功能
const searchStock = () => {
  const query = searchQuery.value.trim()

  if (!query) return

  // 检查是否是6位数字（股票代码）
  if (/^\d{6}$/.test(query)) {
    // 在股票列表中查找匹配的代码
    const matchedStock = stockStore.stockList.find(
      (stock) => stock.dm.includes(query) || stock.dm.startsWith(query),
    )

    if (matchedStock) {
      // 更新全局被选择股票
      stockStore.setSelectedStock(matchedStock)
      // 清空搜索栏并关闭搜索
      searchQuery.value = ''
      showSearch.value = false
      console.log('找到股票:', matchedStock)
    } else {
      // 未找到股票代码
      alert(`未找到股票代码: ${query}`)
      searchQuery.value = ''
    }
  } else {
    // 按股票名称搜索
    const matchedStock = stockStore.stockList.find(
      (stock) => stock.mc.includes(query) || stock.mc.toLowerCase().includes(query.toLowerCase()),
    )

    if (matchedStock) {
      // 更新全局被选择股票
      stockStore.setSelectedStock(matchedStock)
      // 清空搜索栏并关闭搜索
      searchQuery.value = ''
      showSearch.value = false
      console.log('找到股票:', matchedStock)
    } else {
      // 未找到股票名称
      alert(`未找到股票: ${query}`)
      searchQuery.value = ''
    }
  }
}

// 处理头像加载错误
const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // 如果头像加载失败，使用默认头像
  img.src = 'https://i.pravatar.cc/150?u=fallback'
}

// 用户操作处理函数
// 个人资料面板
const handleProfile = () => {
  if (userStore.isLoggedIn) {
    router.push('/profile')
    isUserMenuOpen.value = false
  } else {
    alert('请先登录')
    router.push('/login')
    isUserMenuOpen.value = false
  }
}

const handleSettings = () => {
  router.push('/settings')
  isUserMenuOpen.value = false
}

const handleLogout = () => {
  // 显示确认对话框
  if (confirm('确定要退出登录吗？')) {
    // 关闭用户菜单
    isUserMenuOpen.value = false

    // 调用userStore的logout方法清除登录状态
    userStore.logout()

    // 显示退出成功提示
    alert('已成功退出登录')

    // 跳转到首页
    router.push('/')

    console.log('用户已退出登录')
  }
}

// 点击页面其他地方关闭用户菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-profile')) {
    isUserMenuOpen.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)

  // 如果没有股票数据，尝试从HomeView获取
  if (stockStore.stockList.length === 0) {
    // 这里可以触发加载股票列表，或者等待HomeView加载
    console.log('等待股票列表加载...')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* 基础样式 */
.top-navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 0 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2000;
}

.top-navbar.scrolled {
  top: 10px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

/* Logo样式 */
.logo-section {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px; /* 固定宽度 */
  height: 40px; /* 固定高度 */
  flex-shrink: 0;
  width: 80px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  /* 降级颜色 */
  color: #4f46e5;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  transition: all 0.3s ease;
}

.logo-link:hover {
  background: transparent;
}

.logo:hover {
  transform: scale(1.05);
}

/* 导航链接样式 */
.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
  margin: 0 auto; /* 水平居中 */
}

.nav-item {
  position: relative;
  z-index: 10 !important; /* 提高层级 */
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  padding: 10px 0;
  transition: color 0.3s ease;
  display: block;
  position: relative;
  z-index: 11 !important;
  cursor: pointer !important;
}

.nav-link:hover {
  color: #4f46e5;
  background: transparent;
}

.nav-link.active {
  color: #4f46e5;
  font-weight: 600;
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #4f46e5;
  transition: width 0.3s ease;
  border-radius: 1px;
}

.nav-link:hover .link-underline,
.nav-link.active .link-underline {
  width: 100%;
}

/* 用户操作区域 */
.user-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon-btn {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  background: #f3f4f6;
  color: #4f46e5;
  transform: scale(1.1);
}

.user-profile {
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.avatar:hover {
  border-color: #4f46e5;
  transform: scale(1.05);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar:hover img {
  transform: scale(1.1);
}

.user-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  min-width: 150px;
  z-index: 1001;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: #4b5563;
}

.menu-item:hover {
  background: #f9fafb;
  color: #4f46e5;
}

.menu-item.logout {
  color: #ef4444;
  border-top: 1px solid #f3f4f6;
  margin-top: 5px;
  padding-top: 15px;
}

.menu-item.logout:hover {
  background: #fef2f2;
}

.menu-item.logout.disabled {
  color: #d1d5db;
  cursor: not-allowed;
  background: #f9fafb;
}

.menu-item.logout.disabled:hover {
  background: #f9fafb;
}

.menu-item.disabled {
  color: #d1d5db;
  cursor: not-allowed;
  background: #f9fafb;
}

.menu-item.disabled:hover {
  background: #f9fafb;
  color: #d1d5db;
}

/* 测试按钮禁用样式 */
.testLogin button:disabled,
.testLogin button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #e5e7eb;
  color: #9ca3af;
  border-color: #d1d5db;
}

.testLogin button:disabled:hover,
.testLogin button.disabled:hover {
  transform: none;
  box-shadow: none;
}

/* 搜索栏样式 */
.search-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-container {
  display: flex;
  width: 100%;
  align-items: center;
}

.search-container input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 0;
  background: transparent;
  color: #4b5563;
}

.search-container input::placeholder {
  color: #9ca3af;
}

.close-search {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.close-search:hover {
  background: #f3f4f6;
  color: #4f46e5;
}
.auth-buttons {
  width: 150px;
  position: relative;
  display: flex;
  gap: 8px; /* 按钮之间的间距 */
  align-items: center;
}

.nav-link {
  padding: 8px 16px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

/* 登录按钮样式 */
.login-btn {
  color: #1890ff;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #1890ff;
}

.login-btn:hover {
  color: #ffffff;
  background-color: #1890ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

/* 注册按钮样式 */
.register-btn {
  color: #52c41a;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #52c41a;
}

.register-btn:hover {
  color: #ffffff;
  background-color: #52c41a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .auth-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
  }
}
.welcome-div {
  width: 150px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 25px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  animation: fadeInSlide 0.5s ease-out;
}

.testLogin {
  position: fixed;
  top: 10px;
  left: 100px;
}
</style>
