import response from '../utils/response.js'

export default (schema, params) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[params])
    console.warn(`✅ - file: validate.js:6 - return - value:`, error, value)
    if (error) {
      const err = error.details[0].message
      return res.json(response.validateFailed())
    }
    next()
  }
}
