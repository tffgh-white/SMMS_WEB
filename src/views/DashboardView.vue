<template>
  <div class="dashboard-view-in">
    <div class="dashboard-content">
      <DashboardComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardComponent from '@/components/DashboardView.vue'
</script>

<style scoped>
.dashboard-view {
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  background: transparent;
  box-sizing: border-box;
}

.dashboard-view-in {
  height: 100%;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
.dashboard-view-in::-webkit-scrollbar {
  width: 8px;
}

.dashboard-view-in::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.dashboard-view-in::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.dashboard-view-in::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.page-description {
  margin: 0;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .dashboard-view {
    padding: 15px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .page-description {
    font-size: 14px;
  }
}
</style>
