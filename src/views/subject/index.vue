<template>
  <div>
    <!-- 表头 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="lang" v-model="obj.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="nang" v-model="obj.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="lang" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="nang" v-model="obj.status">
            <el-option label="所有" value></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addSubmit" type="primary">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="grid">
      <el-table :data="subjectList" style="width: 100%">
        <!-- 序号  type='index' -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope='scope'>
            {{scope.row.create_time | mytime}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status == 0 ? '禁用' : '启用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="editBtn(scope.row)">编辑</el-link>&nbsp;
            <el-link
              @click="disable(scope.row)"
              type="primary"
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link @click="delBtn(scope.row)" type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        class="mypagebox"
        background
        :current-page="obj.page"
        :page-sizes="sizesArr"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </el-card>
    <!-- 使用组件 -->
    <!-- 新增学科 -->
    <addDialog ref="addDialog"></addDialog>
    <!-- 编辑学科 -->
    <editDialog ref="editDialog"></editDialog>
  </div>
</template>

<script>
// 导入学科列表封装方法
import { getSubject, changeSubject, delSubject } from "@/api/subject.js";
// 导入新增面板组件
import addDialog from "./com/addDialog.vue";
import editDialog from "./com/editDialog.vue";
export default {
  data() {
    return {
      // 分页器
      // 当前页
      // currentPage: 1,
      // 页容量的数据
      sizesArr: [2, 4, 6, 8, 10],
      // 页容量
      // pageSize: 10,
      // 总数量
      total: 0,
      // 获取表格数据
      subjectList: [],
      // 分页 列表对象
      obj: {
        name: "",
        page: 1,
        limit: 4,
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  // 注册组件
  components: {
    addDialog,
    editDialog
  },
  // 方法
  methods: {
    // 获取学科列表接口方法
    getSubjectData() {
      getSubject(this.obj).then(response => {
        //  window.console.log(response)
        // 获取学科列表信息
        this.subjectList = response.data.data.items;
        // 获取学科列表总数据的总数量
        this.total = response.data.data.pagination.total;
      });
    },
    // 点击禁用按钮  方法
    disable(row) {
      // 得到当前要禁用的学科信息
      let id = row.id;
      changeSubject(id).then(response => {
        // window.console.log(response)
        // 成功返回结果,重新发送请求获取学科数据
        if (response.data.code == 200) {
          this.getSubjectData();
          if (row.status == 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
        }
      });
    },
    // 点击新增学科按钮
    addSubmit() {
      // 访问新增学科面板
      this.$refs.addDialog.dialogFormVisible = true;
    },
    // 点击编辑学科按钮
    editBtn(row) {
      // window.console.log(row);  //得到当前行数据源
      // 打开编辑面板
      this.$refs.editDialog.dialogFormVisible = true;
      //  渲染被点击的数据到编辑面板上form
      // this.$refs.editDialog.form = row
      // 解决双向绑定问题
      // this.$refs.editDialog.form = JSON.parse(JSON.stringify(row));
      // 判断当前点击的编辑数据是否跟上一次点击的是同一条数据,是就不需要重新赋值,不是就重新赋值
      if (row.id != this.$refs.editDialog.form.id) {
        this.$refs.editDialog.form = JSON.parse(JSON.stringify(row));
      }
    },
    // 点击页码刷新数据
    currentChange(index) {
      // index是当前被点击的页码
      // 给被点击的页码page重新赋值
      this.obj.page = index;
      // 重新渲染页面数据
      this.getSubjectData();
    },
    // 点击页容量刷新数据
    sizeChange(index) {
      // index是当前被点击的页容量
      // 给被点击的页容量limit重新赋值
      this.obj.limit = index;
      // 重新渲染页面数据
      this.getSubjectData();
    },
    // 筛选数据内容
    search() {
      // 点击当前页
      this.obj.page=1
      // 重新刷新数据
      this.getSubjectData();
    },
    // 清空筛选数据文本内容
    clearSearch() {
      (this.obj.name = ""),
        (this.obj.rid = ""),
        (this.obj.username = ""),
        (this.obj.status = "");
        // 重新刷新数据
        this.getSubjectData()
    },
    // 删除学科数据
    delBtn(row) {
      this.$confirm("是否确定删除数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delSubject(row.id).then(response => {
            if (response.data.code == 200) {
              // 判断下是否是最后一页的最后一条数据,如果是就跳转到上一页
              if(this.subjectList.length == 1){
                this.obj.page -= 1;
              }
              // 提示用户
              this.$message("删除成功");
              // 重新渲染学科数据
              this.getSubjectData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  // 生命周期
  created() {
    // 调用学科列表接口方法
    this.getSubjectData();
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
.mypagebox {
  text-align: center;
  margin-top: 30px;
}
</style>