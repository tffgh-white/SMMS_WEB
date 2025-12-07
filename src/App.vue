<script setup lang="ts">
// 无需额外逻辑
import TopBar from './components/TopBar.vue'
import { ref } from 'vue'
// 控制内容显示/隐藏
const isContentVisible = ref(true)

const toggleContent = () => {
  isContentVisible.value = !isContentVisible.value
}
</script>

<template>
  <div class="app-window">
    <!-- 眼睛按钮 -->
    <div class="password-eye-container">
      <button
        @click="toggleContent"
        class="password-eye-btn"
        :class="{ 'eye-closed': !isContentVisible }"
      >
        <!-- 眼睛外框 -->
        <div class="eye-outline"></div>
        <!-- 眼球（只在睁眼状态显示） -->
        <div class="eye-pupil" v-show="isContentVisible"></div>
        <!-- 遮罩线（只在闭眼状态显示） -->
        <div class="eye-slash" v-show="!isContentVisible"></div>
      </button>
    </div>
    <!-- 页面内容可以放在这里 -->
    <TopBar v-show="isContentVisible" />
    <div class="board" v-show="isContentVisible">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-window {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('./assets/b.gif');
  background-size: cover; /* 确保图片覆盖整个屏幕 */
  background-position: center; /* 图片居中 */
  background-repeat: no-repeat; /* 防止图片重复 */
  z-index: 0; /**你妈的,原来z-index=-1
  当父元素设置 z-index: -1时，整个元素及其所有子元素都会被置于正常文档流之下。*/
}
.board {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 88%;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 0 20px;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  z-index: 500;
  transition: all 0.3s ease;
}
/* 密码框眼睛容器 */
.password-eye-container {
  width: 10px;
  height: 10px;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

/* 眼睛按钮主体 */
.password-eye-btn {
  width: 10px;
  height: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-eye-btn:hover {
  border-color: #007bff;
  background: #f8f9fa;
}

/* 眼睛外框 */
.eye-outline {
  width: 10px;
  height: 10px;
  border: 1px solid #666;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

/* 眼球 */
.eye-pupil {
  width: 8px;
  height: 8px;
  background: #333;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

/* 斜杠遮罩（闭眼效果） */
.eye-slash {
  position: absolute;
  width: 10px;
  height: 2px;
  background: #ff4757;
  border-radius: 1px;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

/* 闭眼状态的样式 */
.password-eye-btn.eye-closed .eye-outline {
  border-color: #ff4757;
}

.password-eye-btn.eye-closed .eye-pupil {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
}

.password-eye-btn.eye-closed .eye-slash {
  background: #ff4757;
  width: 28px;
}
</style>
