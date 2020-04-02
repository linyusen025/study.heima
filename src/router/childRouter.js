// 导入嵌套路由组件
import chart from '../views/chart/index.vue'   //首页嵌套组件
import user from '../views/user/index.vue'      //首页嵌套组件
import question from '../views/question/index.vue'    //首页嵌套组件
import enterprise from '../views/enterprise/index.vue'    //首页嵌套组件
import subject from '../views/subject/index.vue'      //首页嵌套组件

// 输出嵌套路由
export default [
    { path: 'chart', component: chart, 
    meta: { title: '数据概览', roles: ['超级管理员','管理员', '老师'],fullPath:'/index/chart',icon:'el-icon-pie-chart'} },
    { path: 'user', component: user, 
    meta: { title: '用户列表', roles: ['超级管理员','管理员', '老师'] ,fullPath:'/index/user',icon:'el-icon-user'} },
    { path: 'question', component: question, 
    meta: { title: '题库列表', roles: ['超级管理员','管理员', '老师', '学生'] ,fullPath:'/index/question',icon:'el-icon-edit-outline'} },
    { path: 'enterprise', component: enterprise, 
    meta: { title: '企业列表', roles: ['超级管理员','管理员'] ,fullPath:'/index/enterprise',icon:'el-icon-office-building'} },
    { path: 'subject', component: subject, 
    meta: { title: '学科列表', roles: ['超级管理员','管理员'] ,fullPath:'/index/subject',icon:'el-icon-notebook-2'} }
]