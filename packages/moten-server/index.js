import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/moten', (req, res) => {
  res.send('Hello moten!')
})

app.get('/1111', (req, res) => {
  res.send('Hello 1111!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
