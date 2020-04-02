<template>
  <div>
      <!-- 这里的value是从父组件传过来的value,不能使用简写 -->
      <!-- 接收一个匿名函数为input的事件,这个事件会修改父组件传入的值 -->
    <el-select class="formItem" :value='value' @input="v=>{$emit('input',v)}" placeholder="请选择学科">
      <el-option
        v-for="(item, index) in subjectList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- <el-select class="formItem" v-model="value" placeholder="请选择学科">
      <el-option
        v-for="(item, index) in subjectList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select> -->
  </div>
</template>

<script>
// 导入学科列表方法
import { getSubject } from "@/api/subject.js";

export default {
    // 接收父组件传入的值
    props:['value'],
  data() {
    return {
    //   subject: "",
      subjectList: []
    };
  },
//   侦听器
// watch: {
//     // 传值给父组件
//     subject:function(){
//         this.$emit('input',this.subject)
//     },
//     // 企业
// },
  // 方法
  methods: {
    // 获取学科列表
    getSubjectList() {
      getSubject({ page: 1, limit: 10 }).then(response => {
        //  window.console.log(response)
        this.subjectList = response.data.data.items;
      });
    }
  },
//   生命周期
  created() {
    //   调用学科列表方法
      this.getSubjectList()
    //   获取父组件传入的值
    // this.subject=this.value
  },
};
</script>

<style>
</style>