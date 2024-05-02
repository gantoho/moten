import { getPage } from '../dao/page.js'
import response from '../utils/response.js'

const index = (req, res) => {
  res.json({
    message: 'hello world，你好4',
  })
}

const config = (req, res) => {
  res.json({
    name: 'moten',
    platform: 'monorepo',
    version: '1.0.0',
  })
}

const usersById = (req, res) => {
  const { userId } = req.params
  res.json({
    id: userId,
    name: '用户1',
  })
}

const page = async (req, res) => {
  const page = await getPage()
  res.json(response.success(page))
}

export default { index, config, usersById, page }
