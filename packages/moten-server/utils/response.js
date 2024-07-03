//   成功
const SUCCESS = { code: 200, message: 'success' }
//   失败
const FAILED = { code: 500, message: 'fail' }
//   参数校验失败
const VALIDATE_FAILED = { code: 400, message: 'param validate failed' }
//   接口不存在
const API_NOT_FOUNT = { code: 404, message: 'api does not exist' }

class Response {
  /**
   * 返回code
   */
  code
  /**
   * 返回说明
   */
  message
  /**
   * 返回数据
   */
  data

  /**
   * @param code {number} 返回code
   * @param message {string} 返回说明
   * @param data {any} 返回数据对象
   */
  constructor(code, message, data) {
    this.code = code
    this.message = message || ''
    this.data = data || null
  }

  /**
   * 成功
   */
  static success(data) {
    return new Response(SUCCESS.code, SUCCESS.message, data)
  }

  /**
   * 失败
   */
  static fail(message = '') {
    return new Response(FAILED.code, FAILED.message + message)
  }

  /**
   * 参数校验失败
   */
  static validateFailed(keys) {
    return new Response(
      VALIDATE_FAILED.code,
      VALIDATE_FAILED.message + `${keys ? ': ' + keys : ''}`,
    )
  }

  /**
   * 接口不存在
   */
  static apiNotFount() {
    return new Response(API_NOT_FOUNT.code, API_NOT_FOUNT.message)
  }
}

export const response = Response
