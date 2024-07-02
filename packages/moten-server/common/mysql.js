import mysql from 'mysql2'

const pool = mysql.createPool({
  host: 'localhost', // 主机地址
  user: 'root', // 用户名
  database: 'moten', // 数据库名称
  password: '12345678', // 密码
  port: 3306, // 端口号，默认为 3306
  connectionLimit: 1000, // 最大连接数
  queueLimit: 0, // 排队等待连接的最大请求数，0表示无限制
  waitForConnections: true, // 当连接池达到最大连接数时，是否等待可用连接
  charset: 'UTF8MB4_GENERAL_CI', // 连接字符集，默认为 UTF8_GENERAL_CI
})

// 封装执行函数
export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err instanceof Error) {
        reject(err)
        return
      }
      connection.execute(sql, params, function (err, results) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
        pool.releaseConnection(connection)
      })
    })
  })
}
