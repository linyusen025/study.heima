<template>
  <div>
    <el-select class="formItem" :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择企业">
      <el-option
        v-for="(item, index) in enterpriseList"
        :key="index"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
// 导入企业列表方法
import { apiEnterpriseList } from "@/api/enterprise.js";

export default {
    // 接收父组件传入的值
    props:['value'],
  data() {
    return {
    //   enterprise: "",
      enterpriseList: []
    };
  },
//   侦听器
// watch: {
//     // 传值给父组件
//     enterprise:function(){
//         this.$emit('input',this.enterprise)
//     }
// },
  // 方法
  methods: {
    // 获取企业列表
    getEnterpriseLisst() {
      apiEnterpriseList({ page: 1, limit: 10 }).then(response => {
        // window.console.log(response)
        this.enterpriseList = response.data.data.items;
      });
    }
  },
  //   生命周期
  created() {
    //   调用企业列表方法
    this.getEnterpriseLisst();
    // 获取父组件传入的值
    // this.enterprise=this.value
  }
};
</script>

<style>
</style>