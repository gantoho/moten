import axios, { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 30000,
})
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么，比如添加token等
    return config
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error)
  },
)
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么，比如401错误等需要跳转到登录等
    return response
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error)
  },
)

export interface Response<T> {
  code: number
  message: string
  data?: T
}

export async function get<T>(url: string, params?: any): Promise<Response<T>> {
  const response = await axiosInstance.get<Response<T>>(url, { params })
  return response.data
}
export async function post<T>(url: string, data?: any): Promise<Response<T>> {
  const response = await axiosInstance.post<Response<T>>(url, data)
  return response.data
}
export async function put<T>(url: string, data?: any): Promise<Response<T>> {
  const response = await axiosInstance.put<Response<T>>(url, data)
  return response.data
}
export async function del<T>(url: string, params?: any): Promise<Response<T>> {
  const response = await axiosInstance.delete<Response<T>>(url, { params })
  return response.data
}

// import { get, post } from '@/composable/use-request';
//  try {
//          const response = await get('/users');
//          console.log(response.data);
//        } catch (error) {
//          console.error(error);
//        }
//    ​
//        try {
//          const response = await post('/users', { name: 'John', age: 30 });
//          console.log(response.data);
//        } catch (error) {
//          console.error(error);
//        }
