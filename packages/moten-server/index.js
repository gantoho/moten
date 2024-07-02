import express from 'express'
import cors from 'cors'
import { query } from './common/mysql.js'

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/moten', (req, res) => {
  res.send('Hello moten!')
})

app.get('/1111', async (req, res) => {
  const sql = `SELECT * FROM page WHERE page_id = ? LIMIT 1`
  const params = [1]
  const result = await query(sql, params)
  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
