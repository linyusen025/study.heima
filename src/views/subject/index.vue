<template>
  <div>
    <!-- 表头 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="lang" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="nang" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="lang" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="nang" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="grid">
      <el-table :data="tableData" style="width: 100%">
        <!-- 序号  type='index' -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="address" label="简称"></el-table-column>
        <el-table-column prop="address" label="创建者"></el-table-column>
        <el-table-column prop="address" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.isUse == 0 ? '禁用' : '启用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-link type="primary">编辑</el-link>&nbsp;
            <el-link type="primary">禁用</el-link>&nbsp;
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination class="mypagebox" background
        :current-page="currentPage"
        :page-sizes="sizesArr"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页器
      // 当前页
      currentPage: 1,
      // 页容量的数据
      sizesArr: [10, 20, 30, 40],
      // 页容量
      pageSize: 10,
      // 总数量
      total: 40,
      // 表头
      formInline: {
        user: "",
        region: ""
      },
      // 表格
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isUse: 0 //0为禁用,1为启用
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          isUse: 1
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          isUse: 1
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          isUse: 0
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      window.console.log("submit!");
    }
  }
};
</script>

<style lang='less'>
.demo-form-inline {
  .lang {
    width: 100px;
  }
  .nang {
    width: 150px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
// 表格
.grid {
  margin-top: 20px;
}
// 分页器
.mypagebox{
  text-align: center;
  margin-top: 30px;
}
</style>