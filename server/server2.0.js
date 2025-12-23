import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-in-production';

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'stock_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

let pool;

// 初始化数据库连接
const initDatabase = async () => {
  try {
    console.log('正在连接数据库...');
    console.log('数据库配置:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    });

    // 先连接服务器（不指定数据库）
    const serverConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // 创建数据库（如果不存在）
    await serverConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`数据库 "${dbConfig.database}" 已准备就绪`);

    // 关闭服务器连接
    await serverConnection.end();

    // 创建连接池（使用指定数据库）
    pool = mysql.createPool({
      ...dbConfig,
      charset: 'utf8mb4'
    });

    // 测试数据库连接
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功');
    connection.release();

    // 创建表
    await createTables();
    
    // 创建默认管理员
    await createDefaultAdmin();
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message);
    console.log('5秒后重新尝试连接数据库...');
    setTimeout(initDatabase, 5000);
  }
};

// 创建数据表
const createTables = async () => {
  try {
    // 创建 users 表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(50) NOT NULL,
        loginId VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_loginId (loginId),
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 创建 favorites 表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        stockCode VARCHAR(10) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_stock (userId, stockCode),
        INDEX idx_userId (userId),
        INDEX idx_stockCode (stockCode)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('✅ 数据表创建成功');
  } catch (error) {
    console.error('❌ 创建数据表失败:', error.message);
  }
};

// 创建默认管理员账号
const createDefaultAdmin = async () => {
  try {
    const [existingAdmins] = await pool.query(
      'SELECT * FROM users WHERE loginId = ?',
      ['123456']
    );
    
    if (existingAdmins.length === 0) {
      const hashedPassword = await bcrypt.hash('password', 10);
      await pool.query(
        'INSERT INTO users (nickname, loginId, email, password, avatar) VALUES (?, ?, ?, ?, ?)',
        ['管理员', '123456', 'admin@example.com', hashedPassword, 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin']
      );
      console.log('✅ 默认管理员账号已创建');
    } else {
      console.log('ℹ️  默认管理员账号已存在');
    }
  } catch (error) {
    console.error('创建默认管理员失败:', error.message);
  }
};

// 中间件配置
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// 验证函数
const isValidLoginId = (loginId) => {
  return /^\d+$/.test(loginId) && loginId.length >= 6 && loginId.length <= 10;
};

const isValidPassword = (password) => {
  return password.length >= 6 && password.length <= 15;
};

const isValidNickname = (nickname) => {
  return nickname.length <= 6;
};

// 生成JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      loginId: user.loginId,
      nickname: user.nickname,
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// 中间件：验证Token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: '未提供认证令牌',
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 验证用户是否存在
    const [users] = await pool.query(
      'SELECT id, nickname, loginId, email, avatar, createdAt FROM users WHERE id = ?',
      [decoded.userId]
    );
    
    if (!users[0]) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      });
    }
    
    req.user = users[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: '无效的认证令牌',
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: '认证令牌已过期',
      });
    }
    
    console.error('认证错误:', error.message);
    return res.status(500).json({
      success: false,
      message: '服务器内部错误',
    });
  }
};

// 健康检查接口
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.json({
        success: false,
        message: '数据库未连接',
        data: {
          server: 'running',
          database: 'disconnected',
          timestamp: new Date().toISOString(),
        },
      });
    }
    
    const [result] = await pool.query('SELECT 1 as status');
    
    res.json({
      success: true,
      message: '服务运行正常',
      data: {
        server: 'running',
        database: result[0]?.status === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: '数据库连接异常',
      data: {
        server: 'running',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
    });
  }
});

// 注册接口
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nickname, loginId, email, password, avatar } = req.body;

    // 验证输入
    if (!nickname || !loginId || !email || !password) {
      return res.status(400).json({
        success: false,
        message: '所有字段都是必填的',
      });
    }

    if (!isValidLoginId(loginId)) {
      return res.status(400).json({
        success: false,
        message: '登录ID只能是数字，长度在6-10位之间',
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: '密码长度必须在6-15位之间',
      });
    }

    if (!isValidNickname(nickname)) {
      return res.status(400).json({
        success: false,
        message: '昵称不能超过6个字符',
      });
    }

    // 检查登录ID是否已存在
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE loginId = ?',
      [loginId]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该登录ID已被使用',
      });
    }

    // 检查邮箱是否已存在
    const [existingEmails] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (existingEmails.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该邮箱已被注册',
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultAvatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginId}`;

    // 创建新用户
    const [result] = await pool.query(
      'INSERT INTO users (nickname, loginId, email, password, avatar) VALUES (?, ?, ?, ?, ?)',
      [nickname, loginId, email, hashedPassword, defaultAvatar]
    );

    const newUser = {
      id: result.insertId,
      nickname,
      loginId,
      email,
      avatar: defaultAvatar,
    };

    // 生成token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: '注册成功',
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.error('注册错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 登录接口
app.post('/api/auth/login', async (req, res) => {
  try {
    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: '登录ID和密码都是必填的',
      });
    }

    // 查找用户
    const [users] = await pool.query(
      'SELECT * FROM users WHERE loginId = ?',
      [loginId]
    );

    const user = users[0];
    if (!user) {
      return res.status(401).json({
        success: false,
        message: '用户不存在',
      });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: '密码错误',
      });
    }

    // 移除密码字段
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    // 生成token
    const token = generateToken(user);

    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error('登录错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 获取用户信息接口
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error('获取用户信息错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 更新用户信息接口
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { nickname, avatar } = req.body;
    
    // 验证输入
    if (nickname && !isValidNickname(nickname)) {
      return res.status(400).json({
        success: false,
        message: '昵称不能超过6个字符',
      });
    }
    
    // 构建更新查询
    const updateFields = [];
    const updateValues = [];
    
    if (nickname && nickname !== req.user.nickname) {
      updateFields.push('nickname = ?');
      updateValues.push(nickname);
    }
    
    if (avatar && avatar !== req.user.avatar) {
      updateFields.push('avatar = ?');
      updateValues.push(avatar);
    }
    
    if (updateFields.length === 0) {
      return res.json({
        success: true,
        message: '没有需要更新的信息',
        data: {
          user: req.user,
        },
      });
    }
    
    // 执行更新
    updateFields.push('updatedAt = CURRENT_TIMESTAMP');
    updateValues.push(req.user.id);
    
    await pool.query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    // 获取更新后的用户信息
    const [updatedUsers] = await pool.query(
      'SELECT id, nickname, loginId, email, avatar, createdAt, updatedAt FROM users WHERE id = ?',
      [req.user.id]
    );
    
    const updatedUser = updatedUsers[0];
    
    res.json({
      success: true,
      message: '用户信息更新成功',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('更新用户信息错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 获取所有用户（用于测试）
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await pool.query(
      'SELECT id, nickname, loginId, email, avatar, createdAt FROM users ORDER BY createdAt DESC'
    );
    
    res.json({
      success: true,
      data: {
        users,
        count: users.length,
      },
    });
  } catch (error) {
    console.error('获取所有用户错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 获取用户收藏列表
app.get('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const [favorites] = await pool.query(
      'SELECT id, stockCode, createdAt FROM favorites WHERE userId = ? ORDER BY createdAt DESC',
      [req.user.id]
    );

    res.json({
      success: true,
      data: {
        favorites,
        count: favorites.length,
      },
    });
  } catch (error) {
    console.error('获取收藏列表错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 添加收藏
app.post('/api/favorites', authenticateToken, async (req, res) => {
  try {
    const { stockCode } = req.body;

    if (!stockCode) {
      return res.status(400).json({
        success: false,
        message: '股票代码是必填的',
      });
    }

    // 验证股票代码格式（6位数字）
    if (!/^\d{6}$/.test(stockCode)) {
      return res.status(400).json({
        success: false,
        message: '股票代码必须是6位数字',
      });
    }

    // 检查是否已经收藏过
    const [existingFavorites] = await pool.query(
      'SELECT id FROM favorites WHERE userId = ? AND stockCode = ?',
      [req.user.id, stockCode]
    );

    if (existingFavorites.length > 0) {
      return res.status(400).json({
        success: false,
        message: '该股票已在收藏列表中',
      });
    }

    // 添加收藏
    const [result] = await pool.query(
      'INSERT INTO favorites (userId, stockCode) VALUES (?, ?)',
      [req.user.id, stockCode]
    );

    res.status(201).json({
      success: true,
      message: '添加收藏成功',
      data: {
        id: result.insertId,
        stockCode,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('添加收藏错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 取消收藏
app.delete('/api/favorites/:stockCode', authenticateToken, async (req, res) => {
  try {
    const { stockCode } = req.params;

    if (!stockCode) {
      return res.status(400).json({
        success: false,
        message: '股票代码不能为空',
      });
    }

    // 验证股票代码格式（6位数字）
    if (!/^\d{6}$/.test(stockCode)) {
      return res.status(400).json({
        success: false,
        message: '股票代码必须是6位数字',
      });
    }

    // 查找并删除收藏记录
    const [result] = await pool.query(
      'DELETE FROM favorites WHERE stockCode = ? AND userId = ?',
      [stockCode, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: '未找到该股票的收藏记录',
      });
    }

    res.json({
      success: true,
      message: '取消收藏成功',
      data: {
        removedStockCode: stockCode,
      },
    });
  } catch (error) {
    console.error('取消收藏错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
      error: error.message,
    });
  }
});

// 获取用户统计信息（新功能）
app.get('/api/user/stats', authenticateToken, async (req, res) => {
  try {
    // 获取收藏数量
    const [favoritesCount] = await pool.query(
      'SELECT COUNT(*) as count FROM favorites WHERE userId = ?',
      [req.user.id]
    );

    // 获取注册天数
    const [registerDays] = await pool.query(
      'SELECT DATEDIFF(NOW(), createdAt) as days FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      success: true,
      data: {
        userId: req.user.id,
        nickname: req.user.nickname,
        favoritesCount: favoritesCount[0].count,
        registerDays: registerDays[0].days || 0,
        lastLogin: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('获取用户统计错误:', error.message);
    res.status(500).json({
      success: false,
      message: '服务器内部错误',
    });
  }
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API 路径不存在',
  });
});

// 错误处理中间件
app.use((err, req, res) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 启动服务器前先初始化数据库
const startServer = async () => {
  await initDatabase();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    🚀 股票收藏系统后端服务已启动
    📡 本地访问: http://localhost:${PORT}
    🌐 网络访问: http://0.0.0.0:${PORT}
    
    📊 数据库信息:
       主机: ${dbConfig.host}
       端口: ${dbConfig.port}
       数据库: ${dbConfig.database}
       用户: ${dbConfig.user}
    
    👤 默认管理员账号:
       登录ID: 123456
       密码: password
       邮箱: admin@example.com
    
    🔧 可用接口:
       GET  /api/health          - 健康检查
       POST /api/auth/register   - 用户注册
       POST /api/auth/login      - 用户登录
       GET  /api/user/profile    - 获取用户信息
       PUT  /api/user/profile    - 更新用户信息
       GET  /api/favorites       - 获取收藏列表
       POST /api/favorites       - 添加收藏
       DELETE /api/favorites/:id - 取消收藏
       GET  /api/user/stats      - 用户统计信息
       GET  /api/users           - 获取所有用户（测试用）
    `);
  });
};

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('未处理的 Promise 拒绝:', reason);
});

// 优雅关闭
const shutdown = async () => {
  console.log('正在关闭服务器...');
  if (pool) {
    await pool.end();
    console.log('数据库连接已关闭');
  }
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// 启动应用
startServer();

export default app;