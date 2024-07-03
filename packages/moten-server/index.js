import express from 'express'
import cors from 'cors'
import { error404Handler, errorHandler } from './middleware/error.js'
import { pageController } from './controller/index.js'
import 'express-async-errors'

const app = express()
const port = 8081

app.use(cors())

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

// 页面
app.get('/rest/v1/page', pageController.findAll())
// app.get('/rest/v1/page/:pageId', pageController.findOne())
// app.post('/rest/v1/page/create', pageController.create())
// app.post('/rest/v1/page/delete', pageController.remove())
// app.post('/rest/v1/page/update', pageController.update())

app.use(errorHandler)

app.use('*', error404Handler)
