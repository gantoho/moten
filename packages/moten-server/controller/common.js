import response from '../utils/response.js'

const notFound = (req, res) => {
  res.json(response.fail())
}

const getConfig = (req, res) => {
  res.json({
    name: 'moten',
    platform: 'monorepo',
    version: '1.0.0',
  })
}

export default {
  notFound,
  getConfig,
}
