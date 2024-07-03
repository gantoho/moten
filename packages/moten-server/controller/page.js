import Joi from 'joi'
import { response } from '../utils/response.js'
import { pageDAO } from '../dao/index.js'

export class PageController {
  findAll() {
    const rules = Joi.object({
      page: Joi.number().min(1).optional(),
      size: Joi.number().min(1).optional(),
    })

    return [
      (req, res, next) => {
        const { error } = rules.validate(req.query)
        if (error) {
          const err = error.details[0].message
          return res.json(response.validateFailed(err))
        }
        next()
      },
      async (req, res) => {
        const { page, size } = req.query
        const { status, message, result } = await pageDAO.findAll(page, size)
        if (!status) return res.json(response.fail(message))
        res.json(response.success(result))
      },
    ]
  }
  findOne() {}
  create() {}
  update() {}
  remove() {}
}
