const mysql = require('mysql2')
const express = require('express')
const app = express()

// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost', // 主机地址
  user: 'root', // 用户名
  password: '12345678', // 密码
  port: 3306, // 端口号，默认为 3306
  database: 'moten', // 数据库名称
  charset: 'UTF8MB4_GENERAL_CI', // 连接字符集，默认为 UTF8_GENERAL_CI
  connectTimeout: 10000, // 连接超时时间，单位为毫秒
  multipleStatements: false, // 是否允许一个 query 中有多个 MySQL 语句，默认为 false
})

// 连接到数据库
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err)
    return
  }
  console.log('Connected to database')

  // 执行 SQL 查询,可以用??代替表名、字段、索引名；用?代替数据。
  const sql = 'SELECT * FROM page'
  const params = []
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      return
    }
    console.log('Query results:', results)
  })
})

// 在数据库连接关闭时触发
connection.on('end', () => {
  console.log('Database connection closed')
})

// 在发生错误时触发
connection.on('error', (err) => {
  console.error('Database error:', err)
})

// 执行SQL查询
// connection.execute('SELECT * FROM users WHERE age > ?', [18], function (err, results, fields) {
//   if (err) {
//     console.log('[SELECT ERROR] - ', err.message)
//     return
//   }
//   console.log(results)
// })

// 关闭数据库连接
// connection.end()

app.get('/', function (req, res) {
  res.send({
    message: 'hello world，你好4',
  })
})

app.get('/config', function (req, res) {
  res.send({
    name: 'moten',
    platform: 'monorepo',
    version: '1.0.0',
  })
})

app.get('/users/:userId', function (req, res) {
  const { userId } = req.params
  res.send({
    id: userId,
    name: '用户1',
  })
})

app.listen(8080, () => console.log('app listening on port 8080!'))
