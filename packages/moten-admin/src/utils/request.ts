import axios from 'axios'
import { cloneDeep } from 'lodash'

const { CancelToken } = axios
const cancelTokenSave: any = {}

interface FetchInterface {
  code?: number
  data: any
  message?: string
  status?: boolean
}

// const getParamsReg: any = /\{(.+?)\}/gi;

const fetchApi = (
  path: string,
  method?: any,
  fetchParams?: any,
  options: any = {},
): Promise<FetchInterface> => {
  const methods: Array<string> = ['post', 'put', 'patch']
  let params: any = cloneDeep(fetchParams)
  const isApiNameHttp: boolean = path.includes('http://') || path.includes('https://')
  // const token = userToken();

  const currentAjax: any = {
    url: '',
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
    ...options?.axiosConfig,
  }

  if (typeof method === 'string' && methods.includes(method)) {
    currentAjax.method = method
  } else if (typeof method === 'object') {
    params = cloneDeep(method)
  }

  if (isApiNameHttp) {
    currentAjax.url = path
  } else {
    const link = []

    if (path.startsWith('/')) {
      link.push(path)
    } else {
      link.push(`/${path}`)
    }

    currentAjax.url = link.join('')
  }

  if (options.headers) {
    currentAjax.headers = options.headers
  }

  const startTime = Date.now()
  // 后台需要此参数来代表是一个请求
  if (params) {
    params.isAjax = true
  } else {
    params = {
      isAjax: true,
    }
  }

  if (currentAjax.url.includes('/rest')) {
    delete params.isAjax
  }

  if (methods.includes(currentAjax.method)) {
    // post请求需要的参数
    params.form_key = window.LISTURLKEY.form_key
    currentAjax.data = params
  } else {
    currentAjax.params = params
  }

  if (options.timeout) {
    currentAjax.timeout = options.timeout
  }

  if (options.cancelToken) {
    currentAjax.cancelToken = options.cancelToken
  }

  // 兼容uuid
  // if (!currentAjax.params) {
  //   currentAjax.params = {};
  // }

  // if (globalTrackConf.uuid) {
  //   currentAjax.params.uuid = globalTrackConf.uuid;
  // }

  return new Promise((resolve: any, reject: any) => {
    axios(currentAjax)
      .then((response: any) => {
        const endTime = Date.now() - startTime

        if (import.meta.env.MODE === 'development') {
          console.info(`[axios] ${JSON.stringify(currentAjax)} success ${endTime}ms}`)
          console.debug(currentAjax.url, response, `${endTime}ms`)
        }

        resolve(response.data)
        // if (!(response.data && response.data.code && response.data.code.toString() === '1')) {
        //   toast({title: response.data.message || '接口出现错误，请检查'});
        // }
      })
      .catch((error) => {
        console.error(`[axios-failed-url] ${JSON.stringify(currentAjax)}`)
        if (error.response && error.response.status === 401) {
          resolve({
            code: 401,
            data: {},
            message: '您没有权限使用当前请求',
          })
        } else {
          reject(error)
        }
      })
  })
}

export const cancelFetch = (path: string, params?: any) => {
  const arr: string[] = []
  if (params) {
    let i: string = ''
    for (i in params) {
      arr.push(`i_${JSON.stringify(params[i])}`)
    }
  }
  const apiKey = path + arr.join('_')
  if (cancelTokenSave[apiKey]) {
    cancelTokenSave[apiKey]('cancel')
  }
  return fetchApi(path, params, {
    cancelToken: new CancelToken((cancel: any) => {
      cancelTokenSave[apiKey] = cancel
    }),
  })
}

export default fetchApi
