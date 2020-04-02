<template>
<!-- props:value指定选项的值为选项对象的某个属性值 label指定显示的某个属性值 children子选项 -->
<!-- 与使用这个组件的组件形成父子组件的关系 -->
  <el-cascader class="formItem"
    :value='value' @input="v=>{$emit('input',v)}" :props='{value:"label"}'
    :options="options"
  ></el-cascader>
  <!-- <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
  ></el-cascader> -->
</template>

<script>
// 下载导入第三方包  regionDataPlus是省市区三级联动数据
import { regionDataPlus } from "element-china-area-data";
export default {
    //   value里的数据源不需要写死,需要外界传入
    props:['value'],
  data() {
    return {
      options:  regionDataPlus 
    };
  }
};
</script>

<style>
</style>