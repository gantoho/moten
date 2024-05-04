import dayjs from 'dayjs'
import { query } from '../common/mysql.js'

export const selectPageDao = async (page = 1, size = 10, id) => {
  const firstSql = `SELECT * FROM page ORDER BY page_id DESC LIMIT ?,?`
  const firstParams = [(page - 1) * size, +size]
  const otherSql = `SELECT * FROM page WHERE page_id < ? ORDER BY page_id DESC LIMIT ?`
  const otherParams = [id, +size]
  const sql = +page !== 1 ? otherSql : firstSql
  const params = +page !== 1 ? otherParams : firstParams
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error }
  }
}

export const selectPageByIdDao = async (id) => {
  const sql = `SELECT * FROM page WHERE page_id = ? LIMIT 1`
  const params = [id]
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error }
  }
}

export const insertPageDao = async (keys, values) => {
  const realKey = [...keys, 'create_time', 'update_time']
  const sqlKeys = realKey.join(',')
  const sqlPlaceholders = realKey.map((v) => '?').join(',')
  const sql = `INSERT INTO page (${sqlKeys}) VALUES (${sqlPlaceholders})`
  const time = dayjs().format()
  const params = [...values, time, time]
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error }
  }
}

export const updatePageDao = async (id, keys, values) => {
  const sqlKeys = keys.map((v) => `${v} = ?`).join(',')
  const sql = `UPDATE page SET ${sqlKeys} WHERE page_id = ? LIMIT 1`
  const params = [...values, id]
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error }
  }
}

export const deletePageDao = async (id) => {
  const sql = `DELETE FROM page WHERE page_id = ? LIMIT 1`
  const params = [id]
  try {
    const result = await query(sql, params)
    return { status: true, result }
  } catch (error) {
    return { status: false, message: error }
  }
}
