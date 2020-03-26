// 学科接口
// 导入axios
import axios from 'axios'
// 导入token
import { getToken } from '../utils/mytoken.js'
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

// 封装请求学科列表方法
export function getSubject({
    name, page, limit, rid, username, status
}) {
    return instance({
        url: '/subject/list',
        method: 'get',
        // headers:{
        //     token:getToken()
        // },
        params: {
            name: name,
            page: page,
            limit: limit,
            rid: rid,
            username: username,
            status: status
        }
    })
}

// 封装状态切换方法
export function changeSubject(id) {
    return instance({
        url: '/subject/status',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 封装新增学科的方法
export function addSubject({ rid, name, shortName, intro, remark }) {
    return instance({
        url: '/subject/add',
        method: 'post',
        data: {
            rid: rid,
            name: name,
            short_name: shortName,
            intro: intro,
            remark: remark
        }
    })
}

// 封装编辑学科的方法
export function editSubject({rid, name, short_name, intro, remark,id}) {
    return instance({
        url: '/subject/edit',
        method: 'post',
        data: {
            rid: rid,
            name: name,
            short_name: short_name,
            intro: intro,
            remark: remark,
            id:id
        }
    })
}

// 封装删除学科数据的方法
export function delSubject(id){
    return instance({
        url:'/subject/remove',
        method:'post',
        data:{
            id:id
        }
    })
}