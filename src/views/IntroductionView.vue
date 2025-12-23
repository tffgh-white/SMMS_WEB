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
              <img src="../assets/lin.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">林佳灿</h3>
            </div>
          </div>
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/zou.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">邹新招</h3>
            </div>
          </div>
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/yu.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">余航亮</h3>
            </div>
          </div>
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/liu.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">刘嘉华</h3>
            </div>
          </div>
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/guo.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">郭楚若</h3>
            </div>
          </div>
          <div class="member-info">
            <div class="member-avatar">
              <img src="../assets/zhu.jpg" alt="" />
            </div>
            <div class="member-details">
              <h3 class="member-name">朱柳旭</h3>
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
                <li><strong>Express.js</strong> - RESTful API服务框架</li>
                <li><strong>JWT认证</strong> - 用户身份验证与会话管理</li>
                <li><strong>Bcrypt</strong> - 用户密码安全加密存储</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>💾 数据管理</h3>
              <ul class="tech-list">
                <li><strong>MySQL数据库</strong> - 用户信息与收藏数据持久化</li>
                <li><strong>RESTful API</strong> - 用户认证与收藏管理接口</li>
                <li><strong>数据验证</strong> - 用户输入数据安全验证</li>
                <li><strong>错误处理</strong> - 统一的API错误响应机制</li>
              </ul>
            </div>
            <div class="tech-category">
              <h3>🔌 核心API端点</h3>
              <ul class="tech-list">
                <li><code>POST /api/auth/register</code> - 用户注册</li>
                <li><code>POST /api/auth/login</code> - 用户登录</li>
                <li><code>GET /api/favorites</code> - 获取用户收藏列表</li>
                <li><code>POST /api/favorites</code> - 添加股票到收藏</li>
                <li><code>DELETE /api/favorites/:stockCode</code> - 取消收藏股票</li>
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

      <!-- 项目背景 -->
      <section id="background" class="section">
        <h2 class="section-title">📋 项目背景</h2>
        <div class="card">
          <div class="content">
            <div class="content-point">
              <h3>🎯 项目背景</h3>
              <div class="point-content">
                <p>
                  随着中国资本市场的快速发展，越来越多普通投资者开始参与股票投资。然而，现有的股票管理工具往往存在以下问题：
                </p>
                <ul class="problem-list">
                  <li>信息分散，缺乏统一管理平台</li>
                  <li>界面复杂，学习成本高</li>
                  <li>功能冗余，日常操作繁琐</li>
                  <li>数据更新不及时，影响投资决策</li>
                </ul>
              </div>
            </div>

            <div class="content-point">
              <h3>💡 解决什么问题</h3>
              <div class="point-content">
                <div class="solution-grid">
                  <div class="solution-item">
                    <span class="solution-icon">📊</span>
                    <h4>数据整合</h4>
                    <p>整合多源股票数据，提供统一的信息展示</p>
                  </div>
                  <div class="solution-item">
                    <span class="solution-icon">⭐</span>
                    <h4>收藏管理</h4>
                    <p>个性化收藏功能，快速跟踪关注股票</p>
                  </div>
                  <div class="solution-item">
                    <span class="solution-icon">📱</span>
                    <h4>简化操作</h4>
                    <p>简洁直观的界面设计，降低使用门槛</p>
                  </div>
                  <div class="solution-item">
                    <span class="solution-icon">⚡</span>
                    <h4>实时更新</h4>
                    <p>准确实时的数据更新，助力投资决策</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>👥 目标用户</h3>
              <div class="point-content">
                <div class="user-segments">
                  <div class="user-segment">
                    <h4>🎓 学生投资者</h4>
                    <p>投资新手，需要简单易用的学习工具</p>
                    <div class="user-needs">
                      <span>基础股票信息</span>
                      <span>简单操作界面</span>
                      <span>免费使用</span>
                    </div>
                  </div>
                  <div class="user-segment">
                    <h4>💼 上班族</h4>
                    <p>业余时间理财，追求效率和便捷</p>
                    <div class="user-needs">
                      <span>快速浏览</span>
                      <span>收藏关注</span>
                      <span>移动访问</span>
                    </div>
                  </div>
                  <div class="user-segment">
                    <h4>📈 股票爱好者</h4>
                    <p>有一定投资经验，需要专业工具</p>
                    <div class="user-needs">
                      <span>详细数据</span>
                      <span>技术分析</span>
                      <span>历史回顾</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技术架构 -->
      <section id="architecture" class="section">
        <h2 class="section-title">🏗️ 技术架构</h2>
        <div class="card">
          <div class="content">
            <div class="content-point">
              <h3>🏗️ 整体架构</h3>
              <div class="point-content">
                <div class="system-architecture">
                  <div class="arch-diagram">
                    <div class="layer-title">系统整体架构图</div>
                    <div class="architecture-box">
                      <div class="arch-row">
                        <div class="arch-item client-layer">
                          <div class="arch-label">客户端层</div>
                          <div class="arch-details">
                            <div class="arch-component">Web浏览器</div>
                            <div class="arch-arrow">↓</div>
                            <div class="arch-component">Vue3前端应用</div>
                          </div>
                        </div>
                        <div class="arch-item gateway-layer">
                          <div class="arch-label">网关层</div>
                          <div class="arch-details">
                            <div class="arch-component">Nginx反向代理</div>
                          </div>
                        </div>
                      </div>
                      <div class="arch-row">
                        <div class="arch-item backend-layer">
                          <div class="arch-label">应用层</div>
                          <div class="arch-details">
                            <div class="arch-component">Node.js后端服务</div>
                            <div class="arch-arrow">↓</div>
                            <div class="arch-component">Express.js + JWT认证</div>
                          </div>
                        </div>
                        <div class="arch-item external-api-layer">
                          <div class="arch-label">外部API层</div>
                          <div class="arch-details">
                            <div class="arch-component">前端直连麦蕊智数</div>
                            <div class="arch-arrow">↓</div>
                            <div class="arch-component">股票数据API</div>
                          </div>
                        </div>
                      </div>
                      <div class="arch-row">
                        <div class="arch-item data-layer">
                          <div class="arch-label">数据层</div>
                          <div class="arch-details">
                            <div class="arch-component">MySQL数据库</div>
                            <div class="arch-note">(用户&收藏数据)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="architecture-features">
                    <div class="feature-card">
                      <h4>🎯 架构特点</h4>
                      <ul>
                        <li><strong>前后端分离</strong>：Vue3 + Node.js独立部署</li>
                        <li><strong>数据分离</strong>：用户数据MySQL，股票数据外部API</li>
                        <li><strong>直连设计</strong>：前端直接调用股票API，降低延迟</li>
                        <li><strong>职责清晰</strong>：后端专注用户管理，前端处理数据展示</li>
                      </ul>
                    </div>
                    <div class="feature-card">
                      <h4>🚀 性能优势</h4>
                      <ul>
                        <li><strong>低延迟</strong>：减少网络跳转，提升响应速度</li>
                        <li><strong>高并发</strong>：分散负载，避免服务器瓶颈</li>
                        <li><strong>成本优化</strong>：减少服务器带宽和计算消耗</li>
                        <li><strong>扩展性好</strong>：各层独立，便于横向扩展</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>📋 程序结构</h3>
              <div class="point-content">
                <div class="architecture-overview">
                  <div class="arch-layer frontend-layer">
                    <h4>前端层 (Vue3)</h4>
                    <ul>
                      <li>视图组件：页面和UI组件</li>
                      <li>状态管理：Pinia管理用户和股票状态</li>
                      <li>路由管理：Vue Router处理页面导航</li>
                      <li>API调用：Axios处理HTTP请求</li>
                    </ul>
                  </div>
                  <div class="arch-layer backend-layer">
                    <h4>后端层 (Node.js)</h4>
                    <ul>
                      <li>API服务：Express提供RESTful接口</li>
                      <li>身份认证：JWT token验证机制</li>
                      <li>业务逻辑：用户认证与收藏管理</li>
                      <li>数据访问：MySQL数据库操作</li>
                    </ul>
                  </div>
                  <div class="arch-layer data-layer">
                    <h4>数据层</h4>
                    <ul>
                      <li>MySQL数据库：用户信息和收藏数据持久化</li>
                      <li>外部API：前端直接调用麦蕊智数股票数据</li>
                      <li>本地存储：用户会话和临时数据管理</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>🛠️ 技术选型理由</h3>
              <div class="point-content">
                <div class="tech-choices">
                  <div class="tech-choice">
                    <h4>前端技术栈</h4>
                    <table class="tech-table">
                      <tbody>
                        <tr>
                          <td>Vue 3.5.25</td>
                          <td>现代化框架，Composition API提升代码复用性</td>
                        </tr>
                        <tr>
                          <td>TypeScript</td>
                          <td>类型安全，减少运行时错误，提升开发效率</td>
                        </tr>
                        <tr>
                          <td>Pinia</td>
                          <td>Vue官方推荐的状态管理，简单易用</td>
                        </tr>
                        <tr>
                          <td>ECharts</td>
                          <td>强大的数据可视化库，图表丰富</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="tech-choice">
                    <h4>后端技术栈</h4>
                    <table class="tech-table">
                      <tbody>
                        <tr>
                          <td>Node.js</td>
                          <td>JavaScript运行时，异步I/O性能优秀</td>
                        </tr>
                        <tr>
                          <td>Express.js</td>
                          <td>成熟的Web框架，生态丰富</td>
                        </tr>
                        <tr>
                          <td>MySQL</td>
                          <td>成熟的关系型数据库，ACID事务支持</td>
                        </tr>
                        <tr>
                          <td>JWT</td>
                          <td>无状态认证，适合分布式架构</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>⚙️ 核心逻辑</h3>
              <div class="point-content">
                <div class="core-logic">
                  <div class="logic-flow">
                    <h4>用户认证流程</h4>
                    <div class="flow-steps">
                      <div class="flow-step">用户注册/登录</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">生成JWT Token</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">前端存储Token</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">API请求携带Token</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">后端验证权限</div>
                    </div>
                  </div>

                  <div class="logic-flow">
                    <h4>股票数据流程</h4>
                    <div class="flow-steps">
                      <div class="flow-step">前端直接请求外部API</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">获取实时股票数据</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">前端数据处理展示</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">界面实时更新</div>
                    </div>
                  </div>

                  <div class="logic-flow">
                    <h4>收藏管理逻辑</h4>
                    <div class="flow-steps">
                      <div class="flow-step">用户点击收藏</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">后端验证用户身份</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">检查是否已收藏</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">插入/删除收藏记录</div>
                      <div class="flow-arrow">→</div>
                      <div class="flow-step">更新前端界面</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 功能演示 -->
      <section id="demo" class="section">
        <h2 class="section-title">🎮 核心功能</h2>
        <div class="card">
          <div class="content">
            <div class="content-point">
              <h3>🔐 用户注册与登录</h3>
              <div class="point-content">
                <p>
                  系统提供完整的用户认证功能，支持用户注册、登录和密码安全存储。使用JWT
                  token机制确保会话安全，密码采用Bcrypt加密存储，保障用户数据安全。
                </p>
                <div class="feature-highlight">
                  <span class="highlight-badge">技术特点</span>
                  <p>JWT认证 + Bcrypt加密 + 表单验证</p>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>📈 股票数据浏览</h3>
              <div class="point-content">
                <p>
                  实时展示沪深两市股票数据，支持搜索筛选和详细信息查看。数据来源于专业金融API，确保信息的准确性和时效性，为投资决策提供可靠依据。
                </p>
                <div class="feature-highlight">
                  <span class="highlight-badge">数据特点</span>
                  <p>实时更新 + 专业数据源 + 智能搜索</p>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>⭐ 收藏功能演示</h3>
              <div class="point-content">
                <p>
                  用户可以收藏感兴趣的股票，系统支持收藏的增删改查操作。收藏数据与用户账户绑定，实现个性化管理和跨设备同步。
                </p>
                <div class="feature-highlight">
                  <span class="highlight-badge">功能特点</span>
                  <p>个性化管理 + 数据持久化 + 实时同步</p>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>📊 数据可视化</h3>
              <div class="point-content">
                <p>
                  集成ECharts图表库，提供丰富的股票数据可视化展示。包括K线图、分时图等多种图表类型，支持交互操作和多时间维度分析。
                </p>
                <div class="feature-highlight">
                  <span class="highlight-badge">技术特点</span>
                  <p>ECharts集成 + 交互图表 + 多维分析</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目价值与展望 -->
      <section id="summary" class="section">
        <h2 class="section-title">🚀 项目价值与展望</h2>
        <div class="card">
          <div class="content">
            <div class="content-point">
              <h3>💎 项目价值</h3>
              <div class="point-content">
                <div class="value-grid">
                  <div class="value-item">
                    <span class="value-icon">🎯</span>
                    <h4>解决实际痛点</h4>
                    <p>针对普通投资者的实际需求，提供简单有效的股票管理工具</p>
                  </div>
                  <div class="value-item">
                    <span class="value-icon">🛠️</span>
                    <h4>技术实践价值</h4>
                    <p>完整展示现代Web开发技术栈的应用和最佳实践</p>
                  </div>
                  <div class="value-item">
                    <span class="value-icon">📈</span>
                    <h4>商业应用前景</h4>
                    <p>具备良好的扩展性，可发展为专业的金融信息服务平台</p>
                  </div>
                  <div class="value-item">
                    <span class="value-icon">🌟</span>
                    <h4>用户体验优先</h4>
                    <p>注重用户感受，提供流畅易用的交互体验</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>🔮 改进空间</h3>
              <div class="point-content">
                <div class="improvement-roadmap">
                  <div class="improvement-category">
                    <h4>📊 数据功能</h4>
                    <ul class="improvement-list">
                      <li>增加更多技术指标（MACD、KDJ、RSI等）</li>
                      <li>支持多股票对比分析功能</li>
                      <li>添加财务数据展示</li>
                      <li>实现个性化推荐算法</li>
                    </ul>
                  </div>

                  <div class="improvement-category">
                    <h4>💼 业务功能</h4>
                    <ul class="improvement-list">
                      <li>投资组合管理</li>
                      <li>价格提醒和通知</li>
                      <li>投资记录和分析</li>
                      <li>社交化功能（关注、分享）</li>
                    </ul>
                  </div>

                  <div class="improvement-category">
                    <h4>🔧 技术优化</h4>
                    <ul class="improvement-list">
                      <li>移动端APP开发</li>
                      <li>实时推送服务</li>
                      <li>大数据分析平台</li>
                      <li>AI智能预测功能</li>
                    </ul>
                  </div>

                  <div class="improvement-category">
                    <h4>🌐 服务扩展</h4>
                    <ul class="improvement-list">
                      <li>支持更多数据源</li>
                      <li>国际股票市场支持</li>
                      <li>API开放平台</li>
                      <li>企业版定制服务</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-point">
              <h3>🎯 未来展望</h3>
              <div class="point-content">
                <div class="future-vision">
                  <p>iStock不仅是一个课程项目，更是我们在金融科技领域的探索起点。未来我们将：</p>
                  <div class="vision-items">
                    <div class="vision-item">
                      <span class="vision-icon">🚀</span>
                      <h4>产品化</h4>
                      <p>将项目发展为成熟的产品，服务更多用户</p>
                    </div>
                    <div class="vision-item">
                      <span class="vision-icon">🤖</span>
                      <h4>智能化</h4>
                      <p>引入AI技术，提供智能投资建议</p>
                    </div>
                    <div class="vision-item">
                      <span class="vision-icon">🌍</span>
                      <h4>国际化</h4>
                      <p>扩展到全球市场，支持多语言多币种</p>
                    </div>
                  </div>
                </div>
              </div>
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
          <p>© 2025 iStock 智能股票管理系统</p>
          <p>课程作业展示 | 大数据与供应链管理</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.introduction-page {
  height: 100%;
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

/* 内容样式 */
.content-point {
  margin-bottom: 40px;
}

.content-point h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.point-content {
  font-size: 16px;
  line-height: 1.8;
  color: #374151;
}

.feature-highlight {
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  border-left: 4px solid #f59e0b;
  padding: 16px;
  border-radius: 0 8px 8px 0;
  margin-top: 16px;
}

.highlight-badge {
  background: #f59e0b;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
}

/* 问题列表样式 */
.problem-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.problem-list li {
  padding: 12px 0;
  border-left: 4px solid #ef4444;
  padding-left: 16px;
  margin-bottom: 8px;
  background: #fef2f2;
  border-radius: 0 8px 8px 0;
}

/* 解决方案网格 */
.solution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.solution-item {
  text-align: center;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.solution-item:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.solution-icon {
  font-size: 32px;
  margin-bottom: 12px;
  display: block;
}

.solution-item h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

/* 用户分群样式 */
.user-segments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 20px 0;
}

.user-segment {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-segment h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.user-needs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.user-needs span {
  background: #f3f4f6;
  color: #4b5563;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

/* 架构概览样式 */
.architecture-overview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 0;
}

.arch-layer {
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.arch-layer h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.frontend-layer {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-color: #3b82f6;
}

.backend-layer {
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
  border-color: #f59e0b;
}

.data-layer {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-color: #22c55e;
}

.arch-layer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.arch-layer li {
  padding: 8px 0;
  font-weight: 500;
}

/* 技术选择样式 */
.tech-choices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin: 20px 0;
}

.tech-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.tech-table td {
  padding: 12px;
  border: 1px solid #e2e8f0;
  vertical-align: top;
}

.tech-table td:first-child {
  font-weight: 600;
  background: #f8fafc;
  width: 30%;
}

/* 逻辑流程样式 */
.logic-flow {
  margin-bottom: 32px;
}

.logic-flow h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.flow-steps {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.flow-step {
  background: #667eea;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  min-width: 120px;
}

.flow-arrow {
  font-size: 18px;
  color: #667eea;
  font-weight: 700;
}

/* 价值网格样式 */
.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 20px 0;
}

.value-item {
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  text-align: center;
  transition: all 0.3s ease;
}

.value-item:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.value-icon {
  font-size: 32px;
  margin-bottom: 12px;
  display: block;
}

.value-item h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

/* 改进路线图样式 */
.improvement-roadmap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 20px 0;
}

.improvement-category {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.improvement-category h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.improvement-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.improvement-list li {
  padding: 8px 0;
  position: relative;
  padding-left: 20px;
}

.improvement-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: 700;
}

/* 未来展望样式 */
.future-vision {
  margin: 20px 0;
}

.future-vision > p {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.vision-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.vision-item {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.vision-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
}

.vision-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

.vision-item h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

/* 系统架构样式 */
.system-architecture {
  margin: 24px 0;
}

.arch-diagram {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid #e2e8f0;
}

.layer-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.architecture-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.arch-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.arch-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.arch-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.client-layer {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
}

.gateway-layer {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
}

.backend-layer {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
}

.external-api-layer {
  border-color: #10b981;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.data-layer {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  grid-column: 1 / -1;
}

.arch-label {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
}

.arch-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.arch-component {
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  color: #374151;
  text-align: center;
  min-width: 140px;
}

.arch-arrow {
  font-size: 20px;
  color: #667eea;
  font-weight: 700;
}

.arch-note {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  margin-top: 4px;
}

.architecture-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.feature-card h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-card li {
  padding: 8px 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  line-height: 1.6;
  color: #374151;
}

.feature-card li:last-child {
  border-bottom: none;
}

.feature-card strong {
  color: #1a1a1a;
  font-weight: 600;
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

  .flow-steps {
    flex-direction: column;
  }

  .flow-arrow {
    transform: rotate(90deg);
  }

  .solution-grid,
  .tech-choices,
  .value-grid,
  .improvement-roadmap {
    grid-template-columns: 1fr;
  }

  .arch-row {
    grid-template-columns: 1fr;
  }

  .data-layer {
    grid-column: 1;
  }

  .architecture-features {
    grid-template-columns: 1fr;
  }

  .arch-diagram {
    padding: 20px;
  }
}
</style>
