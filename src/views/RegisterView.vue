<template>
  <div class="RegisterPage">
    <div class="register-container">
      <!-- 装饰性图形 -->
      <div class="decoration">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>

      <!-- 注册表单 -->
      <div class="register-form">
        <div class="form-header">
          <div class="logo">
            <span class="logo-text">iStock</span>
          </div>
          <h2 class="section-title">创建账户</h2>
          <p>请输入您的信息以创建新账户</p>
        </div>

        <form @submit.prevent="handleRegister" class="form-body">
          <!-- 昵称输入框 -->
          <div class="input-group">
            <label for="nickname">昵称</label>
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input
                id="nickname"
                v-model="registerForm.nickname"
                type="text"
                placeholder="请输入昵称"
                maxlength="6"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- 登录ID输入框 -->
          <div class="input-group">
            <label for="loginId">登录ID</label>
            <div class="input-wrapper">
              <span class="input-icon">🆔</span>
              <input
                id="loginId"
                v-model="registerForm.loginId"
                type="text"
                placeholder="请输入登录ID"
                maxlength="10"
                @input="validateLoginId"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- 邮箱输入框 -->
          <div class="input-group">
            <label for="email">电子邮箱</label>
            <div class="input-wrapper">
              <span class="input-icon">✉️</span>
              <input
                id="email"
                v-model="registerForm.email"
                type="email"
                placeholder="请输入电子邮箱"
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
                v-model="registerForm.password"
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

          <!-- 确认密码输入框 -->
          <div class="input-group">
            <label for="confirmPassword">确认密码</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="请再次输入密码"
                maxlength="15"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
                :disabled="isLoading"
              >
                {{ showConfirmPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>

          <!-- 条款同意 -->
          <div class="terms-group">
            <label class="checkbox-wrapper">
              <input v-model="agreeToTerms" type="checkbox" :disabled="isLoading" />
              我已阅读并同意
              <a href="#" class="terms-link">《服务条款》</a> 和
              <a href="#" class="terms-link">《隐私政策》</a>
            </label>
          </div>

          <!-- 注册按钮 -->
          <button type="submit" class="register-btn" :disabled="isLoading || !isFormValid">
            <span v-if="isLoading" class="loading-spinner"></span>
            {{ isLoading ? '注册中...' : '创建账户' }}
          </button>

          <!-- 已有账号链接 -->
          <div class="login-link">
            <p>已有账号？ <router-link to="/login" class="link">立即登录</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/utils/api'

const router = useRouter()

// 密码显示控制
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

// 是否同意条款
const agreeToTerms = ref(false)

// 表单数据
const registerForm = reactive({
  nickname: '',
  loginId: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 验证登录ID只能输入数字
const validateLoginId = (event: Event) => {
  const target = event.target as HTMLInputElement
  // 移除所有非数字字符
  target.value = target.value.replace(/[^0-9]/g, '')
  registerForm.loginId = target.value
}

// 表单验证
const isFormValid = computed(() => {
  return (
    registerForm.nickname &&
    registerForm.loginId &&
    registerForm.email &&
    registerForm.password &&
    registerForm.confirmPassword &&
    registerForm.password === registerForm.confirmPassword &&
    registerForm.loginId.length >= 6 && // 登录ID至少6位
    registerForm.password.length >= 6 && // 密码至少6位
    agreeToTerms.value
  )
})

// 注册处理函数
const handleRegister = async () => {
  if (!isFormValid.value) {
    alert('请完整填写表单并同意条款')
    return
  }

  // 昵称验证
  if (registerForm.nickname.length < 1) {
    alert('请输入昵称')
    return
  }

  // 登录ID验证
  if (registerForm.loginId.length < 6) {
    alert('登录ID至少需要6位数字')
    return
  }

  // 邮箱验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.email)) {
    alert('请输入有效的电子邮箱')
    return
  }

  // 密码验证
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  if (registerForm.password.length < 6) {
    alert('密码至少需要6位字符')
    return
  }

  isLoading.value = true

  try {
    const userData = {
      nickname: registerForm.nickname,
      loginId: registerForm.loginId,
      email: registerForm.email,
      password: registerForm.password,
    }

    console.log('发送注册请求:', userData)
    
    const response = await authAPI.register(userData)
    
    if (response.data && response.data.success) {
      console.log('注册成功:', response.data)
      alert('注册成功！请使用新账号登录')
      // 注册成功后跳转到登录页面
      router.push('/login')
    } else {
      throw new Error(response.data?.message || '注册失败')
    }
  } catch (error: unknown) {
    console.error('注册失败:', error)
    
    // 根据不同的错误类型显示不同的提示
    let errorMessage = '注册失败，请稍后再试'
    
    // 类型守卫：检查是否为Axios错误
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } }
      
      // 确保response存在后再访问其属性
      if (axiosError.response) {
        // 服务器返回的错误
        switch (axiosError.response.status) {
          case 400:
            errorMessage = axiosError.response.data?.message || '注册信息有误'
            break
          case 409:
            errorMessage = '该登录ID已被注册'
            break
          case 500:
            errorMessage = '服务器错误，请稍后再试'
            break
          default:
            errorMessage = axiosError.response.data?.message || '注册失败'
        }
      }
    } else if (error && typeof error === 'object' && 'request' in error) {
      // 网络错误
      errorMessage = '网络连接失败，请检查网络'
    } else if (error instanceof Error) {
      // 其他错误
      errorMessage = error.message || '注册失败'
    }
    
    alert(errorMessage)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.RegisterPage {
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

.register-container {
  display: flex;
  align-items: center;
  justify-content: center; /* 如果内部有多个元素需要居中 */
  width: 100%; /* 或者设置固定宽度，如600px */
  max-width: 600px; /* 限制最大宽度 */
  height: 100%;
  gap: 60px;
  box-sizing: border-box;
}

.register-form {
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: calc(100% - 40px); /* 减去padding */
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto; /* 添加滚动条防止内容溢出 */
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

/* 限制最大高度并添加滚动 */
@media (max-height: 768px) {
  .register-form {
    max-height: 90vh;
    overflow-y: auto;
  }
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

.form-header {
  text-align: center;
}

.form-header h2 {
  color: #333;
  font-size: 28px;
  font-weight: 700;
}

.form-header p {
  color: #666;
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
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-wrapper input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
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

.password-toggle:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.checkbox-wrapper input[type='checkbox'] {
  margin-right: 8px;
}

.checkbox-wrapper input:checked + .checkmark {
  background-color: #667eea;
  border-color: #667eea;
}

.checkbox-wrapper input:checked + .checkmark:after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-link {
  color: #667eea;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
  background: transparent;
}

.register-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
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

.login-link {
  text-align: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e1e5e9;
}

.login-link p {
  color: #666;
  font-size: 14px;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  background: transparent;
}

.link:hover {
  color: #5a67d8;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .register-container {
    flex-direction: column;
    gap: 30px;
    padding: 10px;
  }

  .register-form {
    padding: 30px 20px;
  }

  .form-header h2 {
    font-size: 24px;
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
