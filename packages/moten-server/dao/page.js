import { query } from '../common/mysql.js'

export const selectPageDao = async () => {
  try {
    const result = await query('SELECT * FROM page')
    return result
  } catch (err) {
    console.log('[QUERY ERROR] - ', err.message)
  }
}
