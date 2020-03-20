// 登录接口
import axios from 'axios'
// 基地址封装 axios实例
// axios.create:单独创建一个新的axios实列,这个用法跟axios对象是一样的
// 如果用两个基地址,就可以分别创建两个axios实列,这样就不会弄混
// 创建了axios的实列,就需要把axios给替换掉
let instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
     //  携带cookie解决跨域
     withCredentials: true 
});
// 登录请求封装
export function getLogin({
    phone,
    password,
    code
}){
    return instance({
        url:'/login',
        method:'post',
        data:{
          phone:phone,
          password:password,
          code:code
        },
        
    })
}