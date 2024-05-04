import Joi from 'joi'
import { omit } from 'lodash-es'
import response from '../utils/response.js'
import validate from '../middleware/validate.js'
import {
  selectPageDao,
  selectPageByIdDao,
  insertPageDao,
  updatePageDao,
  deletePageDao,
} from '../dao/page.js'

const getPage = () => {
  const typeKeys = {
    page_id: Joi.number().optional(),
    page: Joi.number().min(1).optional(),
    size: Joi.number().min(1).required(),
  }
  const schema = Joi.object(typeKeys)
  const handler = async (req, res) => {
    const { query } = req
    const { page, size, page_id } = query
    const { status, message, result } = await selectPageDao(page, size, page_id)
    if (!status) return res.json(response.fail(message))
    const pickResult = result.map((item) => omit(item, ['create_time', 'update_time']))
    res.json(response.success(pickResult))
  }
  return [validate(schema, 'query'), handler]
}

const getPageById = () => {
  const typeKeys = {
    pageId: Joi.number().required(),
  }
  const schema = Joi.object(typeKeys)
  const handler = async (req, res) => {
    const { params } = req
    const id = params['pageId']
    const { status, message, result } = await selectPageByIdDao(id)
    if (!status) return res.json(response.fail(message))
    const [pickResult] = result.map((item) => omit(item, ['create_time', 'update_time']))
    res.json(response.success(pickResult))
  }
  return [validate(schema, 'params'), handler]
}

const createPage = () => {
  const typeKeys = {
    name: Joi.string().required(),
    content: Joi.string().required(),
  }
  const schema = Joi.object(typeKeys)
  const handler = async (req, res) => {
    const { body } = req
    const values = Object.values(body)
    const keys = Object.keys(typeKeys)
    const { status, message, result } = await insertPageDao(keys, values)
    if (!status) return res.json(response.fail(message))
    res.json(response.success(null))
  }
  return [validate(schema, 'body'), handler]
}

const updatePage = () => {
  const typeKeys = {
    page_id: Joi.number().required(),
    name: Joi.string().optional(),
    content: Joi.string().optional(),
  }
  const schema = Joi.object(typeKeys)
  const handler = async (req, res) => {
    const { body } = req
    const pickBody = omit(body, ['page_id'])
    const id = body['page_id']
    const keys = Object.keys(pickBody)
    const values = Object.values(pickBody)
    const { status, message, result } = await updatePageDao(id, keys, values)
    if (!status) return res.json(response.fail(message))
    res.json(response.success(null))
  }
  return [validate(schema, 'body'), handler]
}

const deletePage = () => {
  const typeKeys = {
    page_id: Joi.number().required(),
  }
  const schema = Joi.object(typeKeys)
  const handler = async (req, res) => {
    const { body } = req
    const id = body['page_id']
    const { status, message, result } = await deletePageDao(id)
    if (!status) return res.json(response.fail(message))
    res.json(response.success(null))
  }
  return [validate(schema, 'body'), handler]
}

export default {
  getPage,
  getPageById,
  createPage,
  updatePage,
  deletePage,
}
