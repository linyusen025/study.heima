import Vue from 'vue'
import App from './App.vue'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入axios设置全局
// import axios from 'axios'
// Vue.prototype.$axios = axios


Vue.config.productionTip = false

// 5输入router
import router from './router/index.js'
new Vue({
  render: h => h(App),
  // 5注入
  router
}).$mount('#app')
