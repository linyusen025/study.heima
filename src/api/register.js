// 封装注册页面的短信验证码获取
// 导入axios
import axios from 'axios'
// 封装函数
 export function goCode({code,phone}){
    return axios({
        url:process.env.VUE_APP_URL+ `/sendsms`,
        method:'post',
        data:{
            code:code,
            phone:phone
        },
        //  携带cookie解决跨域
           withCredentials: true 
    })
}

// 封装注册用户接口
export function getRegister({
    username,
    phone,
    email,
    avatar,
    password,
    rcode
}){
    return axios({
        url:process.env.VUE_APP_URL+`/register`,
        method:'post',
        data:{
            username:username,
            phone:phone,
            email:email,
            avatar:avatar,
            password:password,
            rcode:rcode
        }
    })
}

