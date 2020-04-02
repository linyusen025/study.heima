<template>
  <div>
    <!-- 表头 -->
    <el-card>
      <el-form :inline="true" :model="obj" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input class="lang" v-model="obj.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
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
          <el-button @click="addbtn" type="primary">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="grid">
      <el-table :data="enterpriseList" style="width: 100%">
        <!-- 序号  type='index' -->
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | mytime}}</template>
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
    <!-- <addEnterprise ref="addEnterprise"></addEnterprise> -->
    <!-- 编辑学科 -->
    <!-- <editEnterprise ref="editEnterprise"></editEnterprise> -->
    <!-- 使用新增&编辑 -->
    <processEnt ref="processEnt"></processEnt>
  </div>
</template>

<script>
// 导入接口封装方法
import {
  apiEnterpriseList,
  apiStatusEnterprise,
  apiDelEnterprise
} from "@/api/enterprise.js";

// 导入企业新增组件
// import addEnterprise from "./com/addEnterprise.vue";
// import editEnterprise from "./com/editEnterprise.vue";
// 导入新增&编辑组件
import processEnt from "./com/processEnt.vue";

export default {
  data() {
    return {
      // 企业列表分页数据
      obj: {
        page: 1, //当前页
        limit: 2, //页容量
        name: "",
        eid: "",
        username: "",
        status: ""
      },
      sizesArr: [2, 4, 6, 8], //页容量数组
      total: 0, //学科列表总条数
      // 企业列表数据
      enterpriseList: []
    };
  },
  // 注册子组件
  components: {
    // addEnterprise,
    // editEnterprise,
    processEnt
  },
  // 生命周期
  created() {
    // 调用获取企业列表的方法
    this.getEnterpriseList();
  },
  // 方法
  methods: {
    // 点击编辑按钮
    editBtn(row) {
      // 打开编辑面板
      // this.$refs.editEnterprise.dialogFormVisible = true;
      // 判断被点击的编辑数据是否是上一次点击的,
      // if (row.id != this.$refs.editEnterprise.form.id) {
      //   // 获取被点击的需要编辑的数据显示在编辑面板上
      //   this.$refs.editEnterprise.form = JSON.parse(JSON.stringify(row));
      // }
      // 打开编辑面板
      this.$refs.processEnt.dialogFormVisible = true;
      // 面板显示为编辑
      this.$refs.processEnt.isEdit = true;
      // 获取要编辑的内容显示在面板上  $nextTick是为了防止把编辑获取到的内容显示为默认form数据
      this.$refs.processEnt.$nextTick(() => {
          // 获取被点击的需要编辑的数据显示在编辑面板上
          this.$refs.processEnt.form = JSON.parse(JSON.stringify(row));
      });
    },
    // 点击删除按钮
    delBtn(row) {
      this.$confirm("确定删除这条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelEnterprise(row.id).then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              // 判断要删除的数据是否是最后一页的最后一条数据
              if (this.enterpriseList.length == 1) {
                // 当前页-1
                this.obj.page -= 1;
              }
              // 提示用户
              this.$message.success("删除成功");
              // 重新刷新页面数据
              this.getEnterpriseList();
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
    // 点击新增按钮
    addbtn() {
      // 打开新增数据面板
      // this.$refs.addEnterprise.dialogFormVisible = true;
      // 打开面板
      this.$refs.processEnt.dialogFormVisible = true;
      // 面板显示为新增
      this.$refs.processEnt.isEdit = false;
      // 点击新增按钮需要把面板数据重置
      this.$refs.processEnt.$nextTick(() => {
        this.$refs.processEnt.$refs.form.resetFields();
      });
    },
    // 获取企业列表
    getEnterpriseList() {
      apiEnterpriseList(this.obj).then(response => {
        // window.console.log(response)
        // 保存企业列表数据
        if (response.data.code == 200) {
          this.enterpriseList = response.data.data.items;
          // 保存数据总条数
          this.total = response.data.data.pagination.total;
        }
      });
    },
    // 点击禁用按钮
    disable(row) {
      //  获取当前要切换状态的数据id
      // let id = row.id;
      // 调用切换状态的方法
      apiStatusEnterprise(row.id).then(response => {
        // window.console.log(response)
        if (response.data.code == 200) {
          // 渲染页面数据
          this.getEnterpriseList();
          if (row.status == 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
        }
      });
    },
    // 点击当前页刷新当前页数据
    currentChange(index) {
      //index是当前被点击的页码
      this.obj.page = index;
      // 重新渲染数据
      this.getEnterpriseList();
    },
    // 总页码改变时触发刷新数据
    sizeChange(index) {
      this.obj.limit = index;
      this.getEnterpriseList();
    },
    // 筛选企业数据
    search() {
      //  this.obj.page=index;
      //  this.obj.page = this.currentChange
      this.obj.page = 1;
      // 重新刷新筛选后的数据
      this.getEnterpriseList();
    },
    // 清空筛选内容
    clearSearch() {
      (this.obj.name = ""),
        (this.obj.eid = ""),
        (this.obj.username = ""),
        (this.obj.status = "");
      // 重新刷新筛选后的数据
      this.getEnterpriseList();
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
.mypagebox {
  text-align: center;
  margin-top: 30px;
}
</style>