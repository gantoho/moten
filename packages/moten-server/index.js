import express from 'express'
import cors from 'cors'
import controller from './controller/index.js'
import error from './middleware/error.js'

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(8080, () => console.log('app listening on port 8080'))

// 公共
app.get('/config', controller.common.getConfig)

// 页面
app.get('/page', ...controller.page.getPage())
app.get('/page/:pageId', ...controller.page.getPageById())
app.post('/page/create', ...controller.page.createPage())
app.post('/page/delete', ...controller.page.deletePage())
app.post('/page/update', ...controller.page.updatePage())

// 数据源

// 用户

// 媒体

// 套件

app.use(error)
