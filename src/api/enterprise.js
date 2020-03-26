// 导入封装好的axios方法  myhttp.js
import instance from '../utils/myhttp.js'

// 封装获取企业列表信息接口
export function apiEnterpriseList({name,page,limit,eid,username,status}){
    return instance({
        url:'/enterprise/list',
        method:'get',
        params:{
            name:name,
            page:page,
            limit:limit,
            eid:eid,
            username:username,
            status:status
        }
    })
}

// 封装企业添加接口
export function apiAddEnterprise({eid,name,short_name,intro,remark}){
    return instance({
        url:'/enterprise/add',
        method:'post',
        data:{
            eid:eid,
            name:name,
            short_name:short_name,
            intro:intro,
            remark:remark,
        }
    })
}

// 封装企业状态设置接口
export function apiStatusEnterprise(id){
    return instance({
        url:'/enterprise/status',
        method:'post',
        data:{
            id:id
        }
    })
}

// 封装企业删除接口
export function apiDelEnterprise(id){
    return instance({
        url:'/enterprise/remove',
        method:'post',
        data:{
            id:id
        }
    })
}

// 封装企业编辑接口
export function apiEditEnterprise({id,name,eid,short_name,intro,remark}){
    return instance({
        url:'/enterprise/edit',
        method:'post',
        data:{
            id:id,
            name:name,
            eid:eid,
            short_name:short_name,
            intro:intro,
            remark:remark
        }
    })
}