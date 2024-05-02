import express from 'express'
import controller from './controller/index.js'

const app = express()
app.listen(8080, () => console.log('app listening on port 8080'))

app.get('/', controller.page.index)
app.get('/config', controller.page.config)
app.get('/users/:userId', controller.page.usersById)
app.get('/page', controller.page.page)
