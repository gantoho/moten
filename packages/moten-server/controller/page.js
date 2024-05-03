import { selectPageDao } from '../dao/page.js'
import response from '../utils/response.js'

const createPage = async (req, res) => {
  const { body } = req
  const { pageId } = body
}
const deletePage = async (req, res) => {}
const updatePage = async (req, res) => {}
const getPageById = async (req, res) => {
  const { params } = req
  const { pageId } = params
}
const getPage = async (req, res) => {
  const { query } = req
  const { page, size } = query
  const result = await selectPageDao()
  res.json(response.success(result))
}

export default {
  createPage,
  deletePage,
  updatePage,
  getPageById,
  getPage,
}
