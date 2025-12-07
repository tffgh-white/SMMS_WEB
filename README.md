# SMMS_WEB - 智能股票管理系统

一个基于 Vue 3 + Node.js 的现代化股票分析和管理平台，提供实时股票数据、技术分析、个人投资组合管理等功能。

## 🎯 项目概述

SMMS_WEB 是一个专业的股票管理系统，集成了：
- 📈 实时股票行情数据
- 📊 K线图技术分析
- ⭐ 股票收藏管理
- 👤 用户账户系统
- 📱 响应式设计
- 🌐 局域网部署支持

## 🏗️ 技术架构

### 前端技术栈
- **Vue 3** - 渐进式JavaScript框架
- **TypeScript** - 类型安全的JavaScript
- **Pinia** - 状态管理
- **Vue Router** - 路由管理
- **ECharts** - 数据可视化
- **Axios** - HTTP客户端
- **Vite** - 构建工具

### 后端技术栈
- **Node.js** - JavaScript运行环境
- **Express** - Web框架
- **JWT** - 身份验证
- **bcryptjs** - 密码加密
- **CORS** - 跨域支持

## 📁 项目结构

```
SMMS_WEB/
├── src/                    # 前端源码
│   ├── components/         # Vue组件
│   │   ├── DashboardView.vue    # 仪表板组件
│   │   ├── TopBar.vue           # 顶部导航栏
│   │   ├── FavoriteButton.vue  # 收藏按钮
│   │   └── RefreshButton.vue    # 刷新按钮
│   ├── views/              # 页面组件
│   │   ├── HomeView.vue         # 首页
│   │   ├── MarketView.vue       # 股票市场
│   │   ├── FavoritesView.vue    # 我的收藏
│   │   ├── DashboardView.vue    # 仪表板
│   │   ├── ProfileView.vue      # 个人资料
│   │   ├── SettingsView.vue     # 设置页面
│   │   ├── LoginView.vue        # 登录页面
│   │   ├── RegisterView.vue     # 注册页面
│   │   └── IntroductionView.vue # 项目介绍
│   ├── stores/             # 状态管理
│   │   ├── user.ts             # 用户状态
│   │   ├── stock.ts            # 股票状态
│   │   └── settings.ts         # 设置状态
│   ├── utils/              # 工具函数
│   │   └── api.ts              # API接口
│   ├── types/              # TypeScript类型定义
│   │   └── api.ts              # API类型
│   └── assets/             # 静态资源
├── server/                 # 后端源码
│   ├── server.js           # Express服务器
│   └── package.json        # 后端依赖
├── public/                 # 公共资源
├── docs/                   # 文档
│   ├── API_DOCS.md         # API文档
│   └── DEPLOYMENT.md       # 部署指南
├── start-server.bat        # 前端启动脚本(Windows)
├── start-server.sh         # 前端启动脚本(Linux/Mac)
├── start-backend.bat       # 后端启动脚本(Windows)
├── start-backend.sh        # 后端启动脚本(Linux/Mac)
├── vite.config.ts          # Vite配置
├── package.json            # 前端依赖
└── README.md              # 项目说明
```

## 🚀 快速开始

### 环境要求
- **Node.js**: >= 20.19.0 或 >= 22.12.0
- **npm**: 最新版本
- **现代浏览器**: Chrome、Firefox、Safari、Edge

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

### 启动服务

#### 方法一：使用启动脚本（推荐）

**Windows用户:**
```bash
# 启动后端服务
start-backend.bat

# 启动前端服务（新终端）
start-server.bat
```

**Linux/Mac用户:**
```bash
# 赋予执行权限
chmod +x start-backend.sh start-server.sh

# 启动后端服务
./start-backend.sh

# 启动前端服务（新终端）
./start-server.sh
```

#### 方法二：使用命令行

```bash
# 启动后端服务（终端1）
cd server
node server.js

# 启动前端服务（终端2）
npm run dev
```

### 访问应用

- **本地访问**: http://localhost:5173
- **后端API**: http://localhost:3001

## 🌐 局域网部署

### 配置说明
项目已配置支持局域网访问，所有服务监听 `0.0.0.0` 接口。

### 部署步骤

1. **获取本机IP地址**
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. **启动服务**
   使用上述启动脚本启动前后端服务

3. **局域网访问**
   - 前端页面: http://[你的IP地址]:5173
   - 后端API: http://[你的IP地址]:3001

### 移动端测试
1. 确保手机/平板与电脑在同一WiFi网络
2. 在手机浏览器中输入: http://[电脑IP]:5173
3. 即可在移动设备上访问和测试

## 📱 功能模块

### 1. 用户系统
- **用户注册**: 支持昵称、登录ID、邮箱注册
- **用户登录**: 基于JWT的安全登录
- **个人资料**: 头像设置、收藏数量统计
- **账户安全**: 密码加密存储

### 2. 股票市场
- **实时行情**: 沪深两市股票实时数据
- **股票搜索**: 支持代码和名称搜索
- **价格展示**: 实时价格、涨跌幅、成交量
- **市场概览**: 整体市场数据展示

### 3. 技术分析
- **K线图**: 专业的K线图表展示
- **成交量分析**: 成交量柱状图
- **技术指标**: 支持多种技术指标
- **历史数据**: 历史价格走势分析

### 4. 投资组合
- **股票收藏**: 添加/删除收藏股票
- **收藏管理**: 个人收藏股票列表
- **快速访问**: 一键跳转到股票分析
- **同步更新**: 收藏数据实时同步

### 5. 系统设置
- **API配置**: 证书密钥管理
- **主题设置**: 界面主题切换
- **系统配置**: 个性化设置选项

## 📊 数据源

### 股票数据API
- **数据提供商**: 麦蕊数据 (mairuiapi.com)
- **数据范围**: 沪深两市A股
- **更新频率**: 实时更新
- **数据类型**: 
  - 基础股票信息
  - 实时价格数据
  - 历史K线数据
  - 成交量信息

### 免费限制
- 每日请求次数限制
- 数据延迟可能存在
- 建议更换许可证获取更多数据

## 🔧 开发指南

### 前端开发
```bash
# 开发模式
npm run dev

# 类型检查
npm run type-check

# 代码格式化
npm run format

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 后端开发
```bash
# 进入服务器目录
cd server

# 开发模式
node server.js

# 安装新依赖
npm install [package-name]
```

### 代码规范
- 使用 TypeScript 进行类型安全开发
- 遵循 Vue 3 Composition API 最佳实践
- 使用 ESLint 和 Prettier 进行代码格式化
- 组件和函数命名使用 camelCase

## 🛠️ 部署指南

### 开发环境
按照"快速开始"章节的说明启动开发服务器

### 生产环境部署

1. **构建前端**
   ```bash
   npm run build
   ```

2. **部署静态文件**
   - 使用 nginx、Apache 等 Web 服务器
   - 或者使用 CDN 服务
   - 配置反向代理到后端 API

3. **部署后端**
   - 使用 PM2、Forever 等进程管理器
   - 配置环境变量
   - 设置 HTTPS 证书

4. **数据库配置**
   - 替换内存存储为数据库
   - 推荐使用 PostgreSQL 或 MySQL
   - 配置数据备份策略

### Docker 部署（可选）

```dockerfile
# Dockerfile 示例
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start"]
```

## 📚 API 文档

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `GET /api/user/profile` - 获取用户信息

### 股票接口
- `GET /api/favorites` - 获取收藏列表
- `POST /api/favorites` - 添加收藏
- `DELETE /api/favorites/:code` - 取消收藏

详细API文档请参考: [API_DOCS.md](docs/API_DOCS.md)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🐛 问题反馈

如果您遇到问题或有建议，请：
1. 查看 [常见问题](docs/DEPLOYMENT.md#故障排除)
2. 搜索现有的 Issues
3. 创建新的 Issue 描述问题

## 🔄 更新日志

### v1.0.0 (当前版本)
- ✅ 用户认证系统
- ✅ 股票数据展示
- ✅ K线图分析
- ✅ 收藏功能
- ✅ 响应式设计
- ✅ 局域网部署

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

## 🎯 项目特色

- **零配置部署**: 提供完整的前后端启动脚本
- **局域网支持**: 开箱即用的局域网访问功能
- **现代化架构**: 基于 Vue 3 + TypeScript 的现代化技术栈
- **响应式设计**: 完美适配桌面和移动设备
- **实时数据**: 集成专业股票数据API
- **用户友好**: 直观的界面设计和流畅的交互体验

**开始使用 SMMS_WEB，开启您的智能股票管理之旅！** 🚀