import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { ResponseStructure } from './types'

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data as ResponseStructure

    // 这里可以根据后端的错误码进行不同的处理
    if (res.code !== 200) {
      message.error(res.msg || '请求失败')
      return Promise.reject(new Error(res.msg || '请求失败'))
    }

    return res.data
  },
  error => {
    // 处理 HTTP 错误状态
    const status = error.response?.status
    switch (status) {
      case 401:
        message.error('未登录或登录已过期')
        // 这里可以添加重定向到登录页的逻辑
        break
      case 403:
        message.error('没有权限访问')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器错误')
        break
      default:
        message.error(error.message || '请求失败')
    }
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export const get = <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
  return instance.get(url, { params })
}

// 封装 POST 请求
export const post = <T = any>(url: string, data?: Record<string, any>): Promise<T> => {
  return instance.post(url, data)
}

// 封装 PUT 请求
export const patch = <T = any>(url: string, data?: Record<string, any>): Promise<T> => {
  return instance.patch(url, data)
}

// 封装 DELETE 请求
export const del = <T = any>(url: string, params?: Record<string, any>): Promise<T> => {
  return instance.delete(url, { params })
}

export default instance
