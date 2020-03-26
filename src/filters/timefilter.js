// 导入vue
import Vue from 'vue'
// 导入moment时间处理器
import moment from 'moment'

// 过滤时间
Vue.filter('mytime',function(value){
    return moment(value).format('YYYY-MM-DD')
})