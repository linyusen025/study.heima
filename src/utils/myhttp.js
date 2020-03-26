// 封装所有axios的方法
// 导入axios
import axios from 'axios'
// 导入token
import { getToken } from './mytoken.js'
// 实例axios
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    //  携带cookie解决跨域
    withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    // 设置请求头 token
    config.headers.token = getToken()
    return config
}, function (error) {
    return Promise.reject(error)
})
// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

// 输出instance
export default instance