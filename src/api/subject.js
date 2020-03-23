// 学科接口
// 导入axios
import axios from 'axios'
// 导入token
import {getToken} from '../utils/mytoken.js'
// 实例axios
const instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
    //  携带cookie解决跨域
    withCredentials: true 
})
// 封装请求学科列表方法
export function getSubject({
    name,page,limit,rid,username,status
}){
    return instance({
        url:'/subject/list',
        method:'get',
        headers:{
            token:getToken()
        },
        params:{
            name:name,
            page:page,
            limit:limit,
            rid:rid,
            username:username,
            status:status
        }
    })
}