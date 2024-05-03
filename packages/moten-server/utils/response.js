class baseResponse {
  /**
   * code
   */
  code
  /**
   * 说明
   */
  message

  constructor(code, message) {
    this.code = code
    this.message = message
  }
  //   成功
  static SUCCESS = new baseResponse(200, 'success')
  //   失败
  static FAILED = new baseResponse(500, 'fail')
  //   参数校验失败
  static VALIDATE_FAILED = new baseResponse(400, 'param validate failed')
  //   接口不存在
  static API_NOT_FOUNT = new baseResponse(404, 'api does not exist')
}

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
    return new Response(baseResponse.SUCCESS.code, baseResponse.SUCCESS.message, data)
  }

  /**
   * 失败
   */
  static fail(message = '') {
    return new Response(baseResponse.FAILED.code, baseResponse.FAILED.message + message)
  }

  /**
   * 参数校验失败
   */
  static validateFailed(keys) {
    return new Response(
      baseResponse.VALIDATE_FAILED.code,
      baseResponse.VALIDATE_FAILED.message + `${keys ? ': ' + keys : ''}`,
    )
  }

  /**
   * 接口不存在
   */
  static apiNotFount() {
    return new Response(baseResponse.API_NOT_FOUNT.code, baseResponse.API_NOT_FOUNT.message)
  }
}

export default Response
