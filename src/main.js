import Vue from 'vue'
import App from './App.vue'

// 下载导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 下载导入vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
Vue.use(VueQuillEditor)

// 导入过滤器组件设置全局过滤器
import './filters/timefilter.js'

// 导入学科&企业组件设置为全局组件
import subject from './components/subjectcom.vue'
import enterprise from './components/enterprisecom.vue'
// 导入城市组件
import mycity from './components/mycity.vue'
// 注册全局组件
Vue.component('subjectcom',subject)
Vue.component('enterprisecom',enterprise)
Vue.component('mycity',mycity)


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
