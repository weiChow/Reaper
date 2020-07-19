'use strict'
/**
 * Created by weiChow on 2020/06/30
 * http
 */

import axios from 'axios'

const http = axios.create({
  timeout: 5000
})

// request 拦截器
http.interceptors.request.use(
  config => config,
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
 * 请求
 * @param url
 * @param options
 * @returns {Promise}
 */
export function request(url, options) {
  switch (options.method) {
    case 'get':
    case 'GET':
      return get(url, { params: options.data || {} })
    case 'post':
    case 'POST':
      return post(url, {
        headers: getRequestHeaders(options),
        transformRequest: [data => transformRequestOptions(options.type, data)]
      })
    case 'patch':
    case 'PATCH':
      return patch(url, {
        headers: getRequestHeaders(options),
        transformRequest: [data => transformRequestOptions(options.type, data)]
      })
    case 'put':
    case 'PUT':
      return put(url, {
        headers: getRequestHeaders(options),
        transformRequest: [data => transformRequestOptions(options.type, data)]
      })
  }
}

/**
 * 获取请求头
 * @param options
 * @returns {any | ({} & {'Content-Type': string} & {})}
 */
function getRequestHeaders(options) {
  const headers = Object.assign(
    {},
    {
      'Content-Type': ''
    },
    options.headers || {}
  )
  switch (options.type) {
    case 'json':
    case 'JSON':
      headers['Content-Type'] = 'application/json'
      break
    case 'form':
    case 'FORM':
      headers['Content-Type'] = 'multipart/form-data'
      break
    default:
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return headers
}

/**
 * 转换请求数据
 * @param type
 * @param data
 * @returns {FormData|*}
 */
function transformRequestOptions(type, data = {}) {
  switch (type) {
    case 'json':
    case 'JSON':
      return data
    case 'form':
    case 'FORM': {
      const formData = new FormData()
      for (const key of Object.keys(data)) {
        if (Object.prototype.toString.call(data[key]) === '[object Array]') {
          data[key].map(item => {
            formData.append(key, item)
          })
        } else {
          formData.append(key, data[key])
        }
      }
      return formData
    }
    default:
      return data
  }
}

/**
 * get
 * @param url
 * @param config
 * @returns {Promise}
 */
function get(url, config) {
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
function post(url, config) {
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
function patch(url, config) {
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
function put(url, config) {
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
