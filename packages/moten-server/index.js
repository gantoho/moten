import express from 'express'
import controller from './controller/index.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.listen(8080, () => console.log('app listening on port 8080'))

// 公共
app.get('/config', controller.common.getConfig)
app.all('*', controller.common.notFound)

// 页面
app.post('/page/create', controller.page.createPage)
app.post('/page/delete', controller.page.deletePage)
app.post('/page/update', controller.page.updatePage)
app.get('/page/:pageId', controller.page.getPageById)
app.get('/page', controller.page.getPage)

// 数据源

// 用户

// 媒体

// 套件
