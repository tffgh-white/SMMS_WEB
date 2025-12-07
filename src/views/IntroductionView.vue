<template>
  <div class="introduction-page">
    <div class="introduction-container">
      <!-- 项目标题 -->
      <div class="project-header">
        <h1 class="project-title">iStock 智能股票管理系统</h1>
        <p class="project-subtitle">基于Vue3 + Node.js的现代化股票数据管理平台</p>
        <div class="project-info">
          <span class="info-badge">课程作业</span>
          <span class="info-badge">Web开发实践</span>
        </div>
      </div>

      <!-- 项目概述 -->
      <section class="section">
        <h2 class="section-title">📊 项目概述</h2>
        <div class="card">
          <p class="project-description">
            iStock是一个功能完整的股票数据管理系统，集成了实时股票数据展示、收藏管理、个人账户管理等功能。
            系统采用前后端分离架构，通过调用麦蕊智数提供的专业股票API，为用户提供准确、及时的股票信息服务。
            本项目旨在展示现代Web开发技术在金融数据管理领域的应用能力。
          </p>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">📈</div>
              <h3>实时数据</h3>
              <p>提供沪深两市股票实时交易数据</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⭐</div>
              <h3>收藏管理</h3>
              <p>支持股票收藏与取消收藏功能</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">👤</div>
              <h3>用户系统</h3>
              <p>完整的用户注册登录与账户管理</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <h3>数据可视化</h3>
              <p>直观的图表展示股票走势</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 参与成员 -->
      <section class="section">
        <h2 class="section-title">👥 参与成员</h2>
        <div class="card">
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/yu.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">余航亮</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- 前端技术实现 -->
      <section class="section">
        <h2 class="section-title">💻 前端技术实现</h2>
        <div class="card">
          <div class="tech-grid">
            <div class="tech-category">
              <h3>🎨 核心框架</h3>
              <ul class="tech-list">
                <li><strong>Vue 3.5.25</strong> - 采用Composition API进行组件开发</li>
                <li><strong>Vue Router 4.6.3</strong> - 实现单页面应用路由管理</li>
                <li><strong>Pinia 3.0.4</strong> - 现代化状态管理解决方案</li>
                <li><strong>TypeScript</strong> - 提供类型安全和更好的开发体验</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>🎨 UI与交互</h3>
              <ul class="tech-list">
                <li><strong>CSS3 + Flexbox/Grid</strong> - 响应式布局设计</li>
                <li><strong>ECharts 6.0</strong> - 数据可视化图表展示</li>
                <li><strong>Vite 7.2.4</strong> - 现代化构建工具</li>
                <li><strong>ESLint + Prettier</strong> - 代码质量保障</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>🔧 核心功能模块</h3>
              <ul class="tech-list">
                <li><strong>用户认证系统</strong> - JWT token认证机制</li>
                <li><strong>股票数据展示</strong> - 实时数据获取与渲染</li>
                <li><strong>收藏管理</strong> - 本地与服务器数据同步</li>
                <li><strong>个人中心</strong> - 用户信息管理界面</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 后端技术实现 -->
      <section class="section">
        <h2 class="section-title">🖥️ 后端技术实现</h2>
        <div class="card">
          <div class="tech-grid">
            <div class="tech-category">
              <h3>⚙️ 服务架构</h3>
              <ul class="tech-list">
                <li><strong>Node.js</strong> - 服务端JavaScript运行环境</li>
                <li><strong>Express.js</strong> - Web应用框架</li>
                <li><strong>JWT认证</strong> - 用户身份验证与授权</li>
                <li><strong>Bcrypt</strong> - 密码加密存储</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>💾 数据管理</h3>
              <ul class="tech-list">
                <li><strong>内存存储</strong> - 用户与收藏数据内存管理</li>
                <li><strong>RESTful API</strong> - 标准化API接口设计</li>
                <li><strong>错误处理</strong> - 完善的异常处理机制</li>
                <li><strong>请求验证</strong> - 输入数据格式验证</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>🔌 核心API端点</h3>
              <ul class="tech-list">
                <li><code>POST /api/auth/login</code> - 用户登录</li>
                <li><code>GET /api/favorites</code> - 获取收藏列表</li>
                <li><code>POST /api/favorites</code> - 添加收藏</li>
                <li><code>DELETE /api/favorites/:stockCode</code> - 取消收藏</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 外部API介绍 -->
      <section class="section">
        <h2 class="section-title">🌐 外部API集成</h2>
        <div class="card">
          <div class="api-intro">
            <p>
              本项目集成了<strong>麦蕊智数企业</strong>提供的专业股票数据API服务，
              通过调用以下接口获取实时、准确的股票市场数据。
            </p>
          </div>

          <div class="api-list">
            <!-- API 1: 股票列表 -->
            <div class="api-item">
              <div class="api-header">
                <h3>1. 沪深两市股票列表</h3>
                <span class="api-badge">基础数据</span>
              </div>
              <div class="api-details">
                <div class="api-url">
                  <strong>接口链接：</strong>
                  <code class="code-block"
                    >http://api.mairuiapi.com/hslt/list/LICENCE-66D8-9F96-0C7F0FBCD073</code
                  >
                </div>
                <div class="api-description">
                  <p>
                    <strong>功能说明：</strong
                    >获取沪深两市所有股票的基础信息，包括股票代码、名称、所属交易所等。
                  </p>
                  <p><strong>数据用途：</strong>用于构建股票选择列表，提供用户浏览和搜索功能。</p>
                </div>
              </div>
            </div>

            <!-- API 2: 实时交易数据 -->
            <div class="api-item">
              <div class="api-header">
                <h3>2. 沪深两市实时交易数据</h3>
                <span class="api-badge">实时数据</span>
              </div>
              <div class="api-details">
                <div class="api-url">
                  <strong>接口链接：</strong>
                  <code class="code-block"
                    >https://api.mairuiapi.com/hsstock/real/time/股票代码/您的licence</code
                  >
                </div>
                <div class="api-example">
                  <strong>示例：</strong>
                  <code class="code-block"
                    >https://api.mairuiapi.com/hsstock/real/time/000001/LICENCE-66D8-9F96-0C7F0FBCD073</code
                  >
                </div>
                <div class="api-description">
                  <p>
                    <strong>功能说明：</strong
                    >获取指定股票的实时交易数据，包括当前价格、涨跌幅、成交量等信息。
                  </p>
                  <p><strong>数据用途：</strong>用于展示股票实时行情，帮助用户了解市场动态。</p>
                </div>
              </div>
            </div>

            <!-- API 3: 历史分时交易 -->
            <div class="api-item">
              <div class="api-header">
                <h3>3. 历史分时交易数据</h3>
                <span class="api-badge">历史数据</span>
              </div>
              <div class="api-details">
                <div class="api-url">
                  <strong>接口链接：</strong>
                  <code class="code-block"
                    >https://api.mairuiapi.com/hsstock/history/股票代码.市场/分时级别/除权方式/您的licence?st=开始时间&et=结束时间&amp;lt=最新条数</code
                  >
                </div>
                <div class="api-example">
                  <strong>示例：</strong>
                  <code class="code-block"
                    >https://api.mairuiapi.com/hsstock/history/000001.SZ/d/n/LICENCE-66D8-9F96-0C7F0FBCD073?st=20240601&amp;et=20250430&amp;lt=100</code
                  >
                </div>
                <div class="api-params">
                  <h4>参数说明：</h4>
                  <ul class="params-list">
                    <li>
                      <strong>股票代码.市场：</strong>格式如 000001.SZ（深交所）或
                      600000.SS（上交所）
                    </li>
                    <li><strong>分时级别：</strong>d-日线，m-分钟线等</li>
                    <li><strong>除权方式：</strong>n-不复权，q-前复权，h-后复权</li>
                    <li><strong>开始时间：</strong>格式20240601（年月日）</li>
                    <li><strong>结束时间：</strong>格式20250430（年月日）</li>
                    <li><strong>最新条数：</strong>限制返回的数据条数</li>
                  </ul>
                </div>
                <div class="api-description">
                  <p>
                    <strong>功能说明：</strong
                    >获取指定时间段内的历史交易数据，支持多种时间维度和除权方式。
                  </p>
                  <p><strong>数据用途：</strong>用于绘制股票K线图，进行技术分析和趋势预测。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目特色 -->
      <section class="section">
        <h2 class="section-title">✨ 项目特色与亮点</h2>
        <div class="card">
          <div class="highlights-grid">
            <div class="highlight-item">
              <h3>🚀 现代化技术栈</h3>
              <p>采用Vue3 + TypeScript + Node.js等最新技术，确保代码质量和开发效率。</p>
            </div>
            <div class="highlight-item">
              <h3>🎯 用户体验优先</h3>
              <p>响应式设计、流畅动画、实时数据更新，提供优秀的使用体验。</p>
            </div>
            <div class="highlight-item">
              <h3>🔒 安全可靠</h3>
              <p>JWT身份认证、密码加密、输入验证，全方位保障数据安全。</p>
            </div>
            <div class="highlight-item">
              <h3>📊 专业数据源</h3>
              <p>集成麦蕊智数专业API，提供准确、及时的股票市场数据。</p>
            </div>
            <div class="highlight-item">
              <h3>⚡ 高性能架构</h3>
              <p>前后端分离、异步数据处理、组件化设计，确保系统高效运行。</p>
            </div>
            <div class="highlight-item">
              <h3>🛠️ 可维护性</h3>
              <p>清晰的代码结构、完善的注释、标准化的开发流程。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目总结 -->
      <section class="section">
        <h2 class="section-title">📝 项目总结</h2>
        <div class="card">
          <div class="summary-content">
            <h3>技术实现亮点</h3>
            <p>
              本项目完整展示了现代Web应用开发的全流程，从前端用户界面设计到后端API开发，再到外部数据源集成，
              每个环节都采用了业界最佳实践。通过Vue3的Composition API实现了组件的模块化开发，
              使用TypeScript确保代码质量，采用Pinia进行状态管理，最终构建出一个功能完善、性能优良的股票管理系统。
            </p>

            <h3>学习收获</h3>
            <p>
              在项目开发过程中，深入学习了前后端分离架构、RESTful API设计、用户认证授权、
              第三方API集成、数据可视化等关键技术。同时锻炼了项目管理、问题解决和代码调试能力。
              这些技能为未来的Web开发工作奠定了坚实基础。
            </p>

            <h3>未来展望</h3>
            <p>
              项目仍有很大的扩展空间，未来可以增加更多技术分析指标、实时数据推送、
              移动端适配、数据库持久化等功能。同时也希望探索人工智能在股票预测中的应用，
              将项目打造成更加智能和专业的金融数据平台。
            </p>
          </div>
        </div>
      </section>

      <!-- 页脚 -->
      <footer class="project-footer">
        <div class="footer-content">
          <p>© 2024 iStock 智能股票管理系统</p>
          <p>课程作业展示 | 现代Web开发实践项目</p>
          <div class="footer-links">
            <span>技术栈：Vue3 + Node.js + TypeScript</span>
            <span>数据来源：麦蕊智数API</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面组件逻辑
</script>

<style scoped>
.introduction-page {
  height: 100vh;
  background: transparent;
  padding: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  position: relative;
}

.introduction-container {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px 20px;
  min-height: 100%;
}

/* 项目头部 */
.project-header {
  text-align: center;
  padding: 60px 40px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.project-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.project-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.project-info {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.info-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

/* 通用样式 */
.section {
  padding: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 项目概述 */
.project-description {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 32px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-item {
  text-align: center;
  padding: 24px;
  border: 2px solid #f3f4f6;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.feature-item p {
  color: #6b7280;
  font-size: 14px;
}

/* 成员信息 */
.member-info {
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.member-avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
  overflow: hidden;
  border: 4px solid #f8fafc;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.member-details h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
}

/* 技术网格 */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.tech-category h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-list {
  list-style: none;
  padding: 0;
}

.tech-list li {
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.tech-list li:last-child {
  border-bottom: none;
}

.tech-list strong {
  color: #1a1a1a;
}

/* API介绍 */
.api-intro {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border-left: 4px solid #667eea;
}

.api-intro p {
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
}

.api-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.api-item {
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.api-item:hover {
  border-color: #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.1);
}

.api-header {
  background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.api-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.api-badge {
  background: #667eea;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.api-details {
  padding: 24px;
}

.api-url {
  margin-bottom: 16px;
}

.api-url strong {
  display: block;
  margin-bottom: 8px;
  color: #374151;
}

.code-block {
  background: #1f2937;
  color: #f3f4f6;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  word-break: break-all;
  display: block;
  margin: 8px 0;
}

.api-example {
  margin-bottom: 16px;
}

.api-params {
  margin-bottom: 16px;
}

.api-params h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.params-list {
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  margin: 0;
  list-style-position: inside;
}

.params-list li {
  padding: 4px 0;
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
}

.api-description {
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}

.api-description p {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 8px;
}

/* 项目特色 */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.highlight-item {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.highlight-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.highlight-item p {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

/* 项目总结样式 */
.summary-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 24px;
  margin-bottom: 12px;
}

.summary-content h3:first-child {
  margin-top: 0;
}

.summary-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 20px;
}

/* 页脚 */
.project-footer {
  background: #1a1a1a;
  color: white;
  padding: 40px;
  text-align: center;
  margin-top: 40px;
}

.footer-content p {
  margin-bottom: 8px;
  font-size: 14px;
  opacity: 0.8;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.footer-links span {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
}

/* 自定义滚动条样式 */
.introduction-page::-webkit-scrollbar {
  width: 16px;
  appearance: none;
}

.introduction-page::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin: 10px 0;
}

.introduction-page::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3));
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  min-height: 40px;
}

.introduction-page::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
  border-color: rgba(255, 255, 255, 0.4);
}

.introduction-page::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
}

/* 火狐浏览器滚动条 */
.introduction-page {
  scrollbar-width: auto;
  scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.15);
}

/* 强制显示滚动条以进行测试 */
.introduction-page {
  overflow-y: scroll !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .introduction-page {
    padding: 20px 16px;
  }

  .project-title {
    font-size: 32px;
  }

  .project-subtitle {
    font-size: 16px;
  }

  .section {
    padding: 24px 20px;
  }

  .section-title {
    font-size: 24px;
  }

  .card {
    padding: 20px;
  }

  .member-info {
    flex-direction: column;
    text-align: center;
  }

  .tech-grid,
  .features-grid,
  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .api-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
