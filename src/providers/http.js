'use strict'
/**
 * Created by weiChow on 2020/06/30.
 * @author weiChow
 * http
 */

import axios from 'axios'

const http = axios.create({
  timeout: 5000
})

// request 拦截器
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器(响应拦截器即异常处理)
http.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    if (error?.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求')
          break
        case 401:
          console.log('未授权，请重新登录')
          break
        case 403:
          console.log('拒绝访问')
          break
        case 404:
          console.log('请求错误,未找到该资源')
          break
        case 405:
          console.log('请求方法未允许')
          break
        case 408:
          console.log('请求超时')
          break
        case 500:
          console.log('服务器端出错')
          break
        case 501:
          console.log('网络未实现')
          break
        case 502:
          console.log('网络错误')
          break
        case 503:
          console.log('服务不可用')
          break
        case 504:
          console.log('网络超时')
          break
        case 505:
          console.log('http版本不支持该请求')
          break
        default:
          console.log(`连接错误${error.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.reject(error.response)
  }
)

/**
 * 获取请求取消源
 */
export function getCancelSource() {
  const { token, cancel } = axios.CancelToken.source()
  return { cancelToken: token, cancel }
}

/**
 * get
 * @param url
 * @param config
 * @returns {Promise}
 */

export function get(url, config = { params: {} }) {
  console.log(config)
  return new Promise((resolve, reject) => {
    http
      .get(url, config)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post
 * @param url
 * @param config
 * @returns {Promise}
 */

export function post(url, config = { data: {} }) {
  return new Promise((resolve, reject) => {
    http.post(url, config).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装patch请求
 * @param url
 * @param config
 * @returns {Promise}
 */

export function patch(url, config = { data: {} }) {
  return new Promise((resolve, reject) => {
    http.patch(url, config).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装put请求
 * @param url
 * @param config
 * @returns {Promise}
 */

export function put(url, config = { data: {} }) {
  return new Promise((resolve, reject) => {
    http.put(url, config).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
