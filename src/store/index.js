// 2导入
import Vuex from 'vuex'
// 3注册
import Vue from 'vue'
Vue.use(Vuex)
// 4实例
const store = new Vuex.Store({
    // 定义
    state:{
       username:'', //用户名字
       userImg:'',  //用户头像
       role:'', //用户角色名
    },
    // 修改
    mutations:{
        // 用户头像名字
       setUser:function(state,backData){
           state.username = backData.username,
           state.userImg = backData.userImg
       },
    //    用户角色名
       setRole:function(state,data){
           state.role = data
       }
    }
})
// 5 输出store
export default store