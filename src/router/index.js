// 2导入
import VueRouter from 'vue-router'

// 导入组件
import login from '../views/login/index.vue'
import index from '../views/index/index.vue'

// 导入css
import '../style/index.css'
// 3导入vue
import Vue from 'vue'
// 3注册
Vue.use(VueRouter)
// 4实例路由
const router = new VueRouter({
    routes: [
        // 默认跳转到登录页
        {path:'*',redirect:'/login'},
        //   登录路由
        {path: '/login',component: login},
        //   首页路由
        {path: '/index',component: index},
    ]
});
// 5输出router
export default router