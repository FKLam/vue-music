import axios from 'axios'

const MUSIC_API = 'http://localhost:3000'

let http = axios.create({
  timeout: 15000,
  withCredentials: true,
  baseURL: MUSIC_API,
  params: {
    ts: new Date().getTime()
  }
})

/**
*  请求拦截
*/
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
*  响应拦截
*/
http.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return Promise.resolve(res)
  }
  if ('sucess' in res.data) {
    return Promise.resolve(res)
  }
  let msg = res.data.msg ? res.data.msg : '数据请求报错'
  console.log(msg)
  return Promise.reject(res)
}, error => {
  return Promise.reject(error)
})
export default http