import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// 中间件
app.use(
  cors({
    origin: true, // 允许所有来源
    credentials: true, // 允许携带凭证
  }),
)
app.use(express.json())

// 内存中的用户数据存储
let users = [
  {
    id: 1,
    nickname: '派大星',
    loginId: '123456',
    email: 'admin@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 密码: password
    avatar:
      'https://img0.baidu.com/it/u=1646993285,2553813898&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    createdAt: new Date().toISOString(),
  },
]

let nextUserId = 2

// 内存中的收藏数据存储
let favorites = [
  { userId: 1, stockCode: '000001', createdAt: '2023-12-01T00:00:00.000Z' },
  { userId: 1, stockCode: '000002', createdAt: '2023-12-02T00:00:00.000Z' },
  { userId: 1, stockCode: '600036', createdAt: '2023-12-03T00:00:00.000Z' },
]

// 验证登录ID是否为数字
const isValidLoginId = (loginId) => {
  return /^\d+$/.test(loginId) && loginId.length >= 6 && loginId.length <= 10
}

// 验证密码长度
const isValidPassword = (password) => {
  return password.length >= 6 && password.length <= 15
}

// 验证昵称长度
const isValidNickname = (nickname) => {
  return nickname.length <= 6
}

// 生成JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      loginId: user.loginId,
      nickname: user.nickname,
    },
    JWT_SECRET,
    { expiresIn: '24h' },
  )
}

// 注册接口
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nickname, loginId, email, password, avatar } = req.body

    // 验证输入
    if (!nickname || !loginId || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '所有字段都是必填的',
      })
    }

    if (!isValidLoginId(loginId)) {
      return res.status(400).json({
        success: false,
        message: '登录ID只能是数字，长度在6-10位之间',
      })
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: '密码长度必须在6-15位之间',
      })
    }

    if (!isValidNickname(nickname)) {
      return res.status(400).json({
        success: false,
        message: '昵称不能超过6个字符',
      })
    }

    // 检查登录ID是否已存在
    const existingUser = users.find((user) => user.loginId === loginId)
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: '该登录ID已被使用',
      })
    }

    // 检查邮箱是否已存在
    const existingEmail = users.find((user) => user.email === email)
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册',
      })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    const newUser = {
      id: nextUserId++,
      nickname,
      loginId,
      email,
      password: hashedPassword,
      avatar: avatar || `https://picsum.photos/seed/user${nextUserId}/150/150.jpg`,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // 生成token
    const token = generateToken(newUser)

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: {
          id: newUser.id,
          nickname: newUser.nickname,
          loginId: newUser.loginId,
          email: newUser.email,
          avatar: newUser.avatar,
        },
        token,
      },
    })
  } catch (error) {
    console.error('注册错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 登录接口
app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginId, password } = req.body

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: '登录ID和密码都是必填的',
      })
    }

    // 查找用户
    const user = users.find((u) => u.loginId === loginId)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      })
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '密码错误',
      })
    }

    // 生成token
    const token = generateToken(user)

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: {
          id: user.id,
          nickname: user.nickname,
          loginId: user.loginId,
          email: user.email,
          avatar: user.avatar,
        },
        token,
      },
    })
  } catch (error) {
    console.error('登录错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 获取用户信息接口
app.get('/api/user/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      })
    }

    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find((u) => u.id === decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      })
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          nickname: user.nickname,
          loginId: user.loginId,
          email: user.email,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
      },
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '无效的认证令牌',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期',
      })
    }

    console.error('获取用户信息错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 获取所有用户（用于测试）
app.get('/api/users', (req, res) => {
  const usersWithoutPassword = users.map((user) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  })

  res.json({
    success: true,
    data: {
      users: usersWithoutPassword,
    },
  })
})

// 获取用户收藏列表
app.get('/api/favorites', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      })
    }

    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find((u) => u.id === decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      })
    }

    // 获取用户的收藏列表
    const userFavorites = favorites.filter((fav) => fav.userId === user.id)

    // 提取股票代码列表
    const favoriteStocks = userFavorites.map((fav) => ({
      stockCode: fav.stockCode,
      createdAt: fav.createdAt,
    }))

    res.json({
      success: true,
      data: {
        favorites: favoriteStocks,
        count: favoriteStocks.length,
      },
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '无效的认证令牌',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期',
      })
    }

    console.error('获取收藏列表错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 添加收藏
app.post('/api/favorites', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const { stockCode } = req.body

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      })
    }

    if (!stockCode) {
      return res.status(400).json({
        success: false,
        message: '股票代码是必填的',
      })
    }

    // 验证股票代码格式（6位数字）
    if (!/^\d{6}$/.test(stockCode)) {
      return res.status(400).json({
        success: false,
        message: '股票代码必须是6位数字',
      })
    }

    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find((u) => u.id === decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      })
    }

    // 检查是否已经收藏过
    const existingFavorite = favorites.find(
      (fav) => fav.userId === user.id && fav.stockCode === stockCode,
    )

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: '该股票已在收藏列表中',
      })
    }

    // 添加收藏
    const newFavorite = {
      userId: user.id,
      stockCode: stockCode,
      createdAt: new Date().toISOString(),
    }

    favorites.push(newFavorite)

    res.status(201).json({
      success: true,
      message: '添加收藏成功',
      data: {
        favorite: {
          stockCode: newFavorite.stockCode,
          createdAt: newFavorite.createdAt,
        },
      },
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '无效的认证令牌',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期',
      })
    }

    console.error('添加收藏错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 取消收藏
app.delete('/api/favorites/:stockCode', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const { stockCode } = req.params

    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      })
    }

    if (!stockCode) {
      return res.status(400).json({
        success: false,
        message: '股票代码是必填的',
      })
    }

    // 验证股票代码格式（6位数字）
    if (!/^\d{6}$/.test(stockCode)) {
      return res.status(400).json({
        success: false,
        message: '股票代码必须是6位数字',
      })
    }

    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = users.find((u) => u.id === decoded.userId)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      })
    }

    // 查找收藏记录
    const favoriteIndex = favorites.findIndex(
      (fav) => fav.userId === user.id && fav.stockCode === stockCode,
    )

    if (favoriteIndex === -1) {
      return res.status(404).json({
        success: false,
        message: '该股票不在收藏列表中',
      })
    }

    // 删除收藏
    favorites.splice(favoriteIndex, 1)

    res.json({
      success: true,
      message: '取消收藏成功',
      data: {
        removedStockCode: stockCode,
      },
    })
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '无效的认证令牌',
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期',
      })
    }

    console.error('取消收藏错误:', error)
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    })
  }
})

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
  console.log(`局域网访问地址: http://0.0.0.0:${PORT}`)
  console.log('默认管理员账号:')
  console.log('登录ID: 123456')
  console.log('密码: password')
})

export default app
