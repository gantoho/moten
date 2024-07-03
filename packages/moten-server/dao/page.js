import { query } from '../common/mysql.js'
import { daoErrorHandler } from '../utils/dao-error.js'

export class PageDAO {
  async findAll(page = 1, size = 10) {
    const sql = `SELECT * FROM page ORDER BY page_id DESC LIMIT ?,?`
    const params = [(page - 1) * size, size].map(String)
    const result = await daoErrorHandler(() => query(sql, params))
    return result
  }
  findOne() {}
  create() {}
  update() {}
  remove() {}
}
