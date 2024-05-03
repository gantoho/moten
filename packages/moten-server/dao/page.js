import { query } from '../common/mysql.js'

export const insertPageDao = async (params, keys) => {
  const sqlKeys = keys.join(', ')
  const sql = `insert into page (${sqlKeys}) values ?`
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error.message }
  }
}

export const updatePageDao = async (params) => {
  const sql = `update page set ? where id = ?`
  try {
    const result = await query(sql, params)
    return result
  } catch (error) {
    console.log('[QUERY ERROR] - ', error.message)
  }
}

export const deletePageDao = async (params) => {
  const sql = `delete from page where id = ?`
  try {
    const result = await query(sql, params)
    return result
  } catch (error) {
    console.log('[QUERY ERROR] - ', error.message)
  }
}

export const selectPageDao = async (params) => {
  try {
    const sql = `'SELECT * FROM page'`
    const result = await query(sql, params)
    return result
  } catch (error) {
    console.log('[QUERY ERROR] - ', error.message)
  }
}
