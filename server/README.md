# SMMS 服务器

这是一个简单的 Node.js Express 服务器，为 SMMS Web 应用程序提供用户认证功能。

## 功能

- 用户注册
- 用户登录
- JWT 认证
- 获取用户信息
- 内存数据存储（无需数据库）

## 安装

```bash
cd server
npm install
```

## 启动服务器

```bash
# 生产模式
npm start

# 开发模式（需要安装 nodemon）
npm run dev
```

服务器默认运行在 `http://localhost:3000`

## API 接口

### 注册

- **URL**: `POST /api/auth/register`
- **请求体**:
  ```json
  {
    "nickname": "用户昵称",
    "loginId": "123456",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **验证规则**:
  - nickname: 最多6个字符
  - loginId: 只能是数字，6-10位
  - password: 6-15位字符
  - email: 有效邮箱格式

### 登录

- **URL**: `POST /api/auth/login`
- **请求体**:
  ```json
  {
    "loginId": "123456",
    "password": "password123"
  }
  ```

### 获取用户信息

- **URL**: `GET /api/user/profile`
- **Headers**: `Authorization: Bearer <token>`

### 获取所有用户（测试用）

- **URL**: `GET /api/users`

## 默认账号

服务器启动时会创建一个默认管理员账号：

- **登录ID**: 123456
- **密码**: password
- **昵称**: admin
- **邮箱**: admin@example.com

## 响应格式

成功响应：
```json
{
  "success": true,
  "message": "操作成功",
  "data": { ... }
}
```

错误响应：
```json
{
  "success": false,
  "message": "错误信息"
}
```

## 注意事项

- 用户数据存储在内存中，服务器重启后数据会丢失
- 这是一个演示服务器，生产环境请使用真实的数据库
- JWT 密钥建议在生产环境中使用环境变量配置