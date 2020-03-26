import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入过滤器组件设置全局过滤器
import './filters/timefilter.js'


Vue.config.productionTip = false

// 5输入router
import router from './router/index.js'
// 6导入store
import store from './store/index.js'
new Vue({
  render: h => h(App),
  // 5注入
  router,
  // 7注入
  store
}).$mount('#app')
