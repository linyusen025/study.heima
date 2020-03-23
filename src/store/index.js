// 2导入
import Vuex from 'vuex'
// 3注册
import Vue from 'vue'
Vue.use(Vuex)
// 4实例
const store = new Vuex.Store({
    // 定义
    state:{
       username:'',
       userImg:''
    },
    // 修改
    mutations:{
       setUser:function(state,backData){
           state.username = backData.username,
           state.userImg = backData.userImg
       }
    }
})
// 5 输出store
export default store