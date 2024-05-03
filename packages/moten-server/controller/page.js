import { insertPageDao, selectPageDao } from '../dao/page.js'
import response from '../utils/response.js'
import validate from '../middleware/validate.js'

const getPage = async (req, res) => {
  const { query } = req
  const { page, size } = query
  const result = await selectPageDao()
  res.json(response.success(result))
}
const getPageById = (req, res) => {
  const { params } = req
  const { pageId } = params
}
const createPage = () => {
  const keys = {
    name: Joi.string().required(),
    content: Joi.object().unknown(true).required(),
  }
  const schema = Joi.object(keys)
  const handler = async (req, res) => {
    const { body } = req
    const { status, message, result } = await insertPageDao(body, Object.keys(keys))
    if (!status) return res.json(response.fail(message))
    res.json(response.success(result))
  }
  return [validate(schema, 'body'), handler]
}
const updatePage = () => {}
const deletePage = () => {}

export default {
  getPage,
  getPageById,
  createPage,
  updatePage,
  deletePage,
}
