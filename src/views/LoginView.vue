<template>
  <div class="LoginPage">
    <div class="login-container">
      <!-- 装饰性图形 -->
      <div class="decoration">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
      <!-- 登录表单 -->
      <div class="login-form">
        <div class="form-header">
          <div class="logo">
            <span class="logo-text">iStock</span>
          </div>
          <h2 class="section-title">账户登录</h2>
          <p>请输入您的信息以登录账户</p>
        </div>

        <form @submit.prevent="handleLogin" class="form-body">
          <!-- 登录ID输入框 -->
          <div class="input-group">
            <label for="loginId">登录ID</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input
                id="loginId"
                v-model="loginForm.loginId"
                type="text"
                placeholder="请输入登录ID"
                maxlength="10"
                @input="validateLoginId"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- 密码输入框 -->
          <div class="input-group">
            <label for="password">密码</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="请输入密码"
                maxlength="15"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
                :disabled="isLoading"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- 记住我和忘记密码 -->
          <div class="form-options">
            <label class="checkbox-wrapper">
              <input v-model="rememberMe" type="checkbox" :disabled="isLoading" />
              <span class="checkmark"></span>
              记住我
            </label>
            <router-link to="/forgot-password" class="forgot-link"> 忘记密码？ </router-link>
          </div>

          <!-- 登录按钮 -->
          <button
            type="submit"
            class="login-btn"
            :disabled="isLoading || !loginForm.loginId || !loginForm.password"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            {{ isLoading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- 注册链接 -->
        <div class="form-footer">
          <p>
            还没有账号？
            <router-link to="/register" class="register-link"> 立即注册 </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { authAPI } from '@/utils/api'

const router = useRouter()
const userStore = useUserStore()
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)

const loginForm = reactive({
  loginId: '',
  password: '',
})

// 验证登录ID只能输入数字
const validateLoginId = (event: Event) => {
  const target = event.target as HTMLInputElement
  // 移除所有非数字字符
  target.value = target.value.replace(/[^0-9]/g, '')
  loginForm.loginId = target.value
}

const handleLogin = async () => {
  if (!loginForm.loginId || !loginForm.password) {
    alert('请填写完整的登录信息')
    return
  }

  if (loginForm.loginId.length < 6) {
    alert('登录ID至少需要6位数字')
    return
  }

  isLoading.value = true
  try {
    console.log('发送登录请求:', { loginId: loginForm.loginId })

    const response = await authAPI.login(loginForm.loginId, loginForm.password)

    if (response.data && response.data.success) {
      // 构造符合LoginData接口的数据
      const loginData = {
        token: response.data.data.token,
        userInfo: response.data.data.user,
      }

      // 登录成功，更新用户状态
      userStore.login(loginData)

      console.log('用户信息:', userStore.userInfo)
      console.log('昵称:', userStore.userInfo?.nickname)
      console.log('登录成功:', response.data.data)
      alert('登录成功！')

      // 跳转到仪表盘或主页
      router.push('/')
    } else {
      // 服务器返回失败状态
      throw new Error(response.data?.message || '登录失败')
    }
  } catch (error: unknown) {
    console.error('登录失败:', error)

    // 根据不同的错误类型显示不同的提示
    let errorMessage = '登录失败，请检查账号密码'

    // 类型守卫：检查是否为Axios错误
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } }

      // 确保response存在后再访问其属性
      if (axiosError.response) {
        // 服务器返回的错误
        switch (axiosError.response.status) {
          case 401:
            errorMessage = '账号或密码错误'
            break
          case 404:
            errorMessage = '用户不存在'
            break
          case 500:
            errorMessage = '服务器错误，请稍后再试'
            break
          default:
            errorMessage = axiosError.response.data?.message || '登录失败'
        }
      }
    } else if (error && typeof error === 'object' && 'request' in error) {
      // 网络错误
      errorMessage = '网络连接失败，请检查网络'
    } else if (error instanceof Error) {
      // 其他错误
      errorMessage = error.message || '登录失败'
    }

    alert(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.LoginPage {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center; /* 在这里居中 */
  background: transparent;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 auto; /* 确保LoginPage自身在父容器中居中 */
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 如果内部有多个元素需要居中 */
  width: 100%; /* 或者设置固定宽度，如600px */
  max-width: 600px; /* 限制最大宽度 */
  height: 100%;
  gap: 60px;
  box-sizing: border-box;
}

/* 装饰性图形 */
.decoration {
  position: relative;
  display: none;
}

@media (min-width: 768px) {
  .decoration {
    display: block;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  .shape-1 {
    width: 100px;
    height: 100px;
    top: -50px;
    right: -50px;
    animation: float 6s ease-in-out infinite;
  }

  .shape-2 {
    width: 60px;
    height: 60px;
    bottom: -30px;
    left: -30px;
    animation: float 4s ease-in-out infinite reverse;
  }

  .shape-3 {
    width: 80px;
    height: 80px;
    top: 50%;
    left: -40px;
    animation: float 5s ease-in-out infinite;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.login-form {
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: calc(100% - 40px); /* 减去padding */
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto; /* 添加滚动条防止内容溢出 */
}

/* 限制最大高度并添加滚动 */
@media (max-height: 768px) {
  .login-form {
    max-height: 90vh;
    overflow-y: auto;
  }
}
.login-form::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.login-form::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.login-form::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.logo-text {
  color: white;
  font-family: Arial, sans-serif;
  font-size: 50px;
  font-weight: 700;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.form-header h2 {
  color: #333;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}

.form-header p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.input-group {
  display: block;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.input-group label {
  display: block;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  z-index: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1.5px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
  height: 48px;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.password-toggle:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-wrapper input[type='checkbox'] {
  margin-right: 8px;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  background: transparent;
}

.forgot-link:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: button;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e1e5e9;
}

.form-footer p {
  color: #666;
  font-size: 14px;
  margin-bottom: 0;
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #5a67d8;
  background: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    gap: 30px;
  }

  .login-form {
    padding: 30px 20px;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .input-group {
    margin-bottom: 18px;
  }

  .form-header h2 {
    font-size: 22px;
  }

  .login-btn {
    padding: 12px 10px;
  }
}

.section-title {
  font-size: 24px !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
  margin: 0 0 20px 0 !important;
  padding: 0 !important;
  color: #333 !important;
  text-align: center !important;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  letter-spacing: normal !important;
  word-spacing: normal !important;
  text-transform: none !important;
  text-decoration: none !important;
  font-style: normal !important;
  font-variant: normal !important;
}
</style>
