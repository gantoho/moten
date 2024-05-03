import mysql from 'mysql2'

// 创建数据库连接
export const pool = mysql.createPool({
  host: 'localhost', // 主机地址
  user: 'root', // 用户名
  password: '12345678', // 密码
  port: 3306, // 端口号，默认为 3306
  database: 'moten', // 数据库名称
  connectionLimit: 1000, // 最大连接数
  queueLimit: 0, // 排队等待连接的最大请求数，0表示无限制
  charset: 'UTF8MB4_GENERAL_CI', // 连接字符集，默认为 UTF8_GENERAL_CI
  waitForConnections: true, // 当连接池达到最大连接数时，是否等待可用连接
})

// 关闭连接池
export const poolClose = () => {
  pool.end()
}

// 封装查询函数
export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, function (err, results, fields) {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}
