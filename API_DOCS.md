# 用户认证 API 文档

## 基础配置

- 基础URL: `http://localhost:3000/api`
- Content-Type: `application/json`
- 认证方式: Bearer Token

## 1. 用户登录

**POST** `/auth/login`

### 请求体

```json
{
  "loginId": "1234567890", // 6-10位数字
  "password": "password123" // 6-15位字符
}
```

### 成功响应

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": 1,
      "name": "用户昵称",
      "email": "user@example.com",
      "avatar": "avatar_url.jpg"
    }
  }
}
```

### 错误响应

```json
{
  "success": false,
  "message": "账号或密码错误"
}
```

## 2. 用户注册

**POST** `/auth/register`

### 请求体

```json
{
  "nickname": "昵称", // 1-6个字符
  "loginId": "1234567890", // 6-10位数字
  "email": "user@example.com",
  "password": "password123" // 6-15位字符
}
```

### 成功响应

```json
{
  "success": true,
  "message": "注册成功"
}
```

### 错误响应

```json
{
  "success": false,
  "message": "该登录ID已被注册"
}
```

## 3. 获取用户信息

**GET** `/user/profile`

### 请求头

```
Authorization: Bearer {token}
```

### 成功响应

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "用户昵称",
    "email": "user@example.com",
    "avatar": "avatar_url.jpg"
  }
}
```

## HTTP状态码说明

- `200`: 请求成功
- `400`: 请求参数错误
- `401`: 未认证或token无效
- `404`: 用户不存在
- `409`: 资源冲突（如ID已存在）
- `500`: 服务器内部错误

## 前端集成说明

1. 前端会自动在请求头中添加 `Authorization: Bearer {token}`
2. 当收到401状态码时，前端会自动清除本地存储并跳转到登录页
3. 所有token会存储在localStorage中持久化保存
