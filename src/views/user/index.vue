<template>
  <div>
    <!-- 表头 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input class="lang" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input class="nang" v-model="obj.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select class="nang" v-model="obj.role_id">
            <el-option label="请选择" value></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addUser" type="primary">
            <i class="el-icon-plus"></i>&nbsp;新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="grid">
      <el-table :data="userList" style="width: 100%" :border="true">
        <!-- 序号  type='index' -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status == 0 ? '禁用' : '启用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link v-if="['管理员','老师'].includes($store.state.role)" type="primary" @click="editBtn(scope.row)">编辑</el-link>&nbsp;
            <el-link
            v-if="['管理员','老师'].includes($store.state.role)"
              @click="disable(scope.row)"
              type="primary"
            >{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link v-if="['管理员'].includes($store.state.role)" @click="delBtn(scope.row)" type="primary">删除</el-link>
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
    <!-- 新增 编辑 组件 -->
    <processUse ref="processUse"></processUse>
  </div>
</template>

<script>
// 导入封装好的方法
import { apiUserList, apiDelUser, apiStatusUser } from "@/api/use.js";
// 导入新增&编辑的组件
import processUse from "./com/processUse.vue";

export default {
  data() {
    return {
      // 分页数据源
      obj: {
        page: 1,
        limit: 3,
        username: "",
        email: "",
        role_id: ""
      },
      // 页容量
      sizesArr: [3, 6, 9],
      // 用户列表总条数
      total: 0,
      // 用户列表信息
      userList: []
    };
  },
  // 注册组件
  components: {
    processUse
  },
  // 方法
  methods: {
    // 获取用户列表信息
    getUserList() {
      apiUserList(this.obj).then(response => {
        // window.console.log(response);
        if (response.data.code == 200) {
          // 保存用户列表数据
          this.userList = response.data.data.items;
          // 保存用户列表总条数
          this.total = response.data.data.pagination.total;
        }
      });
    },
    // 新增按钮
    addUser() {
      // 打开面板
      this.$refs.processUse.dialogFormVisible = true;
      // 面板显示为新增
      this.$refs.processUse.isUser = false;
      // 点击新增按钮需要把面板数据重置  $nextTick是
      this.$refs.processUse.$nextTick(() => {
        this.$refs.processUse.$refs.form.resetFields();
      });
    },
    // 编辑按钮
    editBtn(row) {
      // 打开编辑面板
      this.$refs.processUse.dialogFormVisible = true;
      // 访问子组件 编辑面板
      this.$refs.processUse.isUser = true;
      // 获取要编辑的内容显示在面板上  $nextTick是为了防止把编辑获取到的内容显示为默认form数据
      this.$refs.processUse.$nextTick(() => {
          this.$refs.processUse.form = JSON.parse(JSON.stringify(row));
      });
    },
    //  删除按钮
    delBtn(row) {
      this.$confirm("确定删除此条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelUser(row.id).then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              // 判断删除的数据是否是最后一页最后一条数据,当前页-=1
              if (this.userList.length == 1) {
                this.obj.page -= 1;
              }
              // 提示用户
              this.$message.success("删除成功");
              // 刷新页面数据
              this.getUserList();
            } else {
              this.$message.error(response.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 切换状态按钮
    disable(row) {
      apiStatusUser(row.id).then(response => {
        // window.console.log(response)
        // 刷新页面数据
        this.getUserList();
        if (response.data.code == 200) {
          if (row.status == 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
        }
      });
    },
    //  点击筛选按钮刷新页面数据
    search() {
      this.obj.page = 1;
      this.getUserList();
    },
    // 清空筛选
    clearSearch() {
      this.obj.username = "";
      (this.obj.email = ""), (this.obj.role_id = "");
      this.getUserList();
    },
    //  点击页容量刷新页面数据
    sizeChange(index) {
      this.obj.limit = index;
      this.getUserList();
    },
    // 点击页码刷新页面数据
    currentChange(index) {
      this.obj.page = index;
      this.getUserList();
    }
  },
  // 生命周期
  created() {
    // 调用方法获取用户列表信息
    this.getUserList();
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