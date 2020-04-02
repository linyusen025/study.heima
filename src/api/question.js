// 导入封装好的axios方法
import instance from '../utils/myhttp.js'

// 封装获取题目列表接口
export function apiQuestion({
    title,
    subject,
    enterprise,
    type,
    step,
    username,
    status,
    difficulty,
    create_date,
    page,
    limit
}) {
    return instance({
        url: '/question/list',
        method: 'get',
        params: {
            title,
            subject,
            enterprise,
            type,
            step,
            username,
            status,
            difficulty,
            create_date,
            page,
            limit
        }
    })
}

// 封装新增题库列表接口
export function apiAddQuestion({
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options,
}) {
    return instance({
        url: '/question/add',
        method: 'post',
        data: {
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options,
        }
    })
}

// 封装题库状态接口
export function apiQuestionStatus(id) {
    return instance({
        url: '/question/status',
        method: 'post',
        data: {
            id
        }
    })
}

// 删除题库接口
export function apiDelQuestion(id) {
    return instance({
        url: '/question/remove',
        method: 'post',
        data: {
            id
        }
    })
}

// 编辑题库接口
export function apiEditQuestion({
    id,
    user_id,
    title,
    subject,
    step,
    enterprise,
    city,
    type,
    difficulty,
    single_select_answer,
    multiple_select_answer,
    short_answer,
    video,
    answer_analyze,
    remark,
    select_options,
}) {
    return instance({
        url: '/question/edit',
        method: 'post',
        data: {
            id,
            user_id,
            title,
            subject,
            step,
            enterprise,
            city,
            type,
            difficulty,
            single_select_answer,
            multiple_select_answer,
            short_answer,
            video,
            answer_analyze,
            remark,
            select_options,
        }
    })
}

// 获取题木信息
export function apiTopicQuestion(id){
    return instance({
        url:'/question/one',
        method:'post',
        data:{
            id
        }
    })
}