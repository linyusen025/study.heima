// 2导入
import VueRouter from 'vue-router'

// 导入组件
import login from '../views/login/index.vue'   //登录页
import index from '../views/index/index.vue'   //首页
// import chart from '../views/chart/index.vue'   //首页嵌套组件
// import user from '../views/user/index.vue'      //首页嵌套组件
// import question from '../views/question/index.vue'    //首页嵌套组件
// import enterprise from '../views/enterprise/index.vue'    //首页嵌套组件
// import subject from '../views/subject/index.vue'      //首页嵌套组件

// 导入嵌套路由组件
import child from './childRouter.js'

// 导入nprogress进度条
import NProgress from 'nprogress' //脚本
import 'nprogress/nprogress.css'   //css

// 导入cookie
import { getToken } from '../utils/mytoken'
// 导入登录请求方法
import { getInfo } from '../api/index.js'
// 导入message
import { Message } from 'element-ui'
// 导入store
import store from '../store/index.js'

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
        { path: '*', redirect: '/login' },
        //   登录路由
        { path: '/login', component: login, meta: { roles: ['超级管理员','管理员', '老师', '学生'] } },
        //   首页路由
        {
            path: '/index', component: index, meta: { roles: ['超级管理员','管理员', '老师', '学生'] },
            children:child
        },
    ]
});

// 全局前置守卫  to 是要跳转的目标路由 from 是跳转的当前路由 next()是否执行后续代码
router.beforeEach((to, from, next) => {
    // 获取路由里设置的meta
    const title = to.meta.title;
    if (title) {
        // 设置给document.title
        document.title = title;
    }
    // 启动进度条
    NProgress.start()
    // 先判断要请求的页面是否是登录页面
    if (to.path !== '/login') {
        // 判断是否存在token
        if (!getToken()) {
            // this.$router.push('/login') //错误
            // router.push('/login');
            // 提示用户未登录
            Message.error('你还未登录');
            NProgress.done();
            next('/login');
        } else {
            // 判断token的真假
            getInfo().then(response => {
                // 判断登录返回的用户是否为禁用状态
                if (response.data.data.status == 0) {
                    Message.error('账号已被禁用,请联系管理员')
                    // 关闭进度条
                    NProgress.done()
                } else {
                    if (response.data.code == 200) {
                        // window.console.log(response)
                        // 保存一个对象
                        let userInfo = {}
                        userInfo.username = response.data.data.username  //获取到用户名
                        // 获取到用户头像
                        userInfo.userImg = process.env.VUE_APP_URL + '/' + response.data.data.avatar
                        // 取出store里的数据
                        store.commit('setUser', userInfo)

                        // 获取当前登录系统的用户角色
                        const role = response.data.data.role
                        store.commit('setRole',role)
                        // window.console.log(role)
                        // 判断当前访问的路由权限列表中是否有当前登录系统的用户角色
                        if (to.meta.roles.includes(role)) {
                            // 如果包含就继续访问
                            next()
                        } else {
                            Message.error('抱歉,你没有访问此路由的权限')
                            // 关闭进度条
                            NProgress.done()
                        }
                    } else if (response.data.code == 206) {
                        //    router.push('/login')  下面简写模式
                        Message.error('你还未登录');
                        NProgress.done();
                        next('/login');
                    }

                }
            })
        }
    } else {
        next()
    }
})
// 全局后置钩子
router.afterEach(() => {
    // 关闭进度条
    NProgress.done()
})

// 5输出router
export default router