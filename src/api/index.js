// 封装首页方法
// 导入axios
import axios from 'axios'
// 导入token方法
import {getToken} from '@/utils/mytoken.js'
// 创建实例对象
const instance = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    //  携带cookie解决跨域
    withCredentials: true 
})
// 封装发送请求
export function getInfo(){
    return instance({
        url:'/info',
        method:'get',
        headers:{
            token:getToken()
        }
    })
}

// 退出登录方法
export function getLogout(){
   return instance({
       url:'/logout',
       method:'get',
       headers:{
           token:getToken()
       }
   })
}