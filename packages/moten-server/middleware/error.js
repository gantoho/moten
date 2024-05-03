import response from '../utils/response.js'

export default (err, req, res, next) => {
  const msg = err.message
  res.json(response.fail(msg))
}
