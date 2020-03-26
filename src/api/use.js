// 导入封装好的axios的路径方法
import instance from '../utils/myhttp.js'

// 封装获取用户列表接口
export function apiUserList({ username, email, role_id, page, limit }) {
    return instance({
        url: '/user/list',
        method: 'get',
        params: {
            username,
            email,
            role_id,
            page,
            limit
        }
    })
}

// 封装新增用户接口
export function apiAddUser({ username, email, phone, role_id, status, remark }) {
    return instance({
        url: '/user/add',
        method: 'post',
        data: {
            username,
            email,
            phone,
            role_id,
            status,
            remark
        }
    })
}

// 封装用户状态接口
export function apiStatusUser(id) {
    return instance({
        url: '/user/status',
        method: 'post',
        data: {
            id
        }
    })
}

// 封装删除用户接口
export function apiDelUser(id) {
    return instance({
        url: '/user/remove',
        method: 'post',
        data: {
            id
        }
    })
}

// 封装编辑用户接口
export function apiEditUser({
    id,
    username,
    phone,
    email,
    avatar,
    password,
    remark,
    status,
    role_id
}) {
    return instance({
        url: '/user/edit',
        method: 'post',
        data: {
            id,
            username,
            phone,
            email,
            avatar,
            password,
            remark,
            status,
            role_id
        }
    })
}