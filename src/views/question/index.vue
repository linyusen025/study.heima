<template>
  <div class="quesBox">
    <!-- 表头区域 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- 使用学科组件 -->
          <!-- 父组件传值给子组件 -->
          <!-- <subjectcom v-bind:value='formInline.subject' @input='changesubject'></subjectcom> -->
          <subjectcom v-model="formInline.subject"></subjectcom>
          <!-- <el-select class="formItem" v-model="formInline.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="阶段">
          <el-select class="formItem" v-model="formInline.step" placeholder="请选择阶段">
            <!-- <el-option label="请选择" value></el-option> -->
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <!-- 使用企业组件 -->
          <!-- 父组件传值给子组件 -->
          <!-- <enterprisecom v-bind:value='formInline.enterprise' @input='changeenterprise'></enterprisecom> -->
          <enterprisecom v-model="formInline.enterprise"></enterprisecom>
          <!-- <el-select class="formItem" v-model="formInline.enterprise" placeholder="请选择企业">
            <el-option
              v-for="(item, index) in enterpriseList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="题型">
          <el-select class="formItem" v-model="formInline.type" placeholder="请选择题型">
            <!-- <el-option label="请选择" value></el-option> -->
            <el-option label="单选" :value="1"></el-option>
            <el-option label="多选" :value="2"></el-option>
            <el-option label="简答" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select class="formItem" v-model="formInline.difficulty" placeholder="请选择难度">
            <!-- <el-option label="请选择" value></el-option> -->
            <el-option label="简单" :value="1"></el-option>
            <el-option label="一般" :value="2"></el-option>
            <el-option label="困难" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input class="formItem" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="formItem" v-model="formInline.status" placeholder="请选择状态">
            <!-- <el-option label="请选择" value></el-option> -->
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 日期组件  type="datetime"可以同时进行日期和时间的选择 -->
        <el-form-item label="日期">
          <el-date-picker
            style="width:150px"
            v-model="formInline.create_date"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="标题">
          <el-input class="mytitle" v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAdd">
            <i class="el-icon-plus"></i>&nbsp;新增试题
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card>
      <el-table :data="questionList" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <!-- 解析p标签 -->
        <el-table-column label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.answer_analyze"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template slot-scope="scope">
            {{scope.row.subject_name}}
            .
            <span v-if="scope.row.step ==1">初级</span>
            <span v-if="scope.row.step ==2">中级</span>
            <span v-if="scope.row.step ==3">高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-if="scope.row.type==2">多选</span>
            <span v-if="scope.row.type==3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status==0 ? '禁用' : '启用'}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="onEdit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disBtn(scope.row)">{{scope.row.status==0 ? '启用' : '禁用'}}</el-link>&nbsp;
            <el-link type="primary" @click="delBtn(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="limitChange"
        @current-change="pageChange"
        :current-page="formInline.page"
        :page-sizes="sizesArr"
        :page-size="formInline.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 使用新增组件 -->
    <questionAdd ref="questionAdd"></questionAdd>
  </div>
</template>

<script>
// 导入学科列表方法
// import { getSubject } from "@/api/subject.js";
// 导入企业列表方法
// import { apiEnterpriseList } from "@/api/enterprise.js";
// 导入题库接口
import {
  apiQuestion,
  apiQuestionStatus,
  apiDelQuestion
} from "@/api/question.js";
// 导入学科列表组件
// import subjectcom from '@/components/subjectcom.vue'
// 导入企业列表组件
// import enterprisecom from '@/components/enterprisecom.vue'
// 导入题库新增组件
import questionAdd from "./com/questionAdd.vue";

export default {
  data() {
    return {
      // 表头数据源
      formInline: {
        title: "", //标题
        subject: "", //学科
        enterprise: "", //企业
        type: "", //题型
        step: "", //阶段
        username: "", //作者
        status: "", //状态
        difficulty: "", //难度
        create_date: "", //创建日期
        page: 1, //当前页
        limit: 2 //当前页容量
      },
      // 分页数据源
      sizesArr: [2, 4, 8], //总页容量
      total: 0, //总条数

      // 表格数据源
      questionList: [],
      // 保存学科列表
      subjectList: [],
      // 保存企业列表
      enterpriseList: []
    };
  },
  // 注册组件
  components: {
    // 注册新增
    questionAdd
    //   subjectcom,
    //   enterprisecom
  },
  // 方法
  methods: {
    // 获取学科列表
    // getSubjectList() {
    //   getSubject({ page: 1, limit: 10 }).then(response => {
    //     //  window.console.log(response)
    //     this.subjectList = response.data.data.items;
    //   });
    // },
    // 接收学科子组件传入的值
    changesubject(value) {
      this.formInline.subject = value;
    },
    // 获取企业列表
    // getEnterpriseLisst() {
    //   apiEnterpriseList({ page: 1, limit: 10 }).then(response => {
    //     // window.console.log(response)
    //     this.enterpriseList = response.data.data.items;
    //   });
    // },
    // 接收企业子组件传入的值
    changeenterprise(value) {
      this.formInline.enterprise = value;
    },
    // 获取题库列表
    getQuestionList() {
      apiQuestion(this.formInline).then(response => {
        // window.console.log(response)
        if (response.data.code == 200) {
          this.questionList = response.data.data.items;
          // 获取总条数
          this.total = response.data.data.pagination.total;
        } else {
          this.$message.error(response.data.message);
        }
      });
    },
    // 新增按钮
    onAdd() {
      // 打开新增面板
      this.$refs.questionAdd.dialogFormVisible = true;
      // false为新增
      this.$refs.questionAdd.isQusetion = false;
      // 重置面板数据 $nextTick染页面渲染完成再恢复到默认值状态
      this.$refs.questionAdd.$nextTick(() => {
        this.$refs.questionAdd.$refs.form.resetFields();
      });
    },
    // 编辑按钮
    onEdit(row) {
      // 打开编辑面板
      this.$refs.questionAdd.dialogFormVisible = true;
      //true为编辑
      this.$refs.questionAdd.isQusetion = true;
      // 获取题库列表  $nextTick染页面渲染完成再恢复到默认值状态
      this.$refs.questionAdd.$nextTick(() => {
        this.$refs.questionAdd.form = JSON.parse(JSON.stringify(row));
      });
    },
    // 删除按钮
    delBtn(row) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelQuestion(row.id).then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              // 判断当前要删除的数据是否是最后一页最后一条
              if (this.questionList.length == 1) {
                this.formInline.page -= 1;
              }
              // 提示用户
              this.$message.success("删除成功");
              // 刷新页面数据
              this.getQuestionList();
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
    // 禁用启用按钮
    disBtn(row) {
      apiQuestionStatus(row.id).then(response => {
        // window.console.log(response);
        if (response.data.code == 200) {
          // 刷新页面
          this.getQuestionList();
          if (row.status == 0) {
            this.$message.success("启用成功");
          } else {
            this.$message.success("禁用成功");
          }
        } else {
          this.$message.success(response.data.message);
        }
      });
    },
    // 搜索按钮
    search() {
      // 当前页
      this.formInline.page = 1;
      // 刷新页面
      this.getQuestionList();
    },
    // 清除搜索按钮
    clearSearch() {
      // 清空
      this.formInline.title = "";
      this.formInline.subject = "";
      this.formInline.enterprise = "";
      this.formInline.type = "";
      this.formInline.step = "";
      this.formInline.username = "";
      this.formInline.status = "";
      this.formInline.difficulty = "";
      this.formInline.create_date = "";
      // 刷新页面
      this.getQuestionList();
    },
    // 点击页容量刷新页面
    limitChange(index) {
      this.formInline.limit = index;
      this.getQuestionList();
    },
    // 点击当前页刷新页容量
    pageChange(index) {
      this.formInline.page = index;
      this.getQuestionList();
    }
  },
  // 生命周期
  created() {
    // 调用获取学科列表方法
    // this.getSubjectList();
    // 调用获取企业列表方法
    // this.getEnterpriseLisst();
    // 获取题库列表方法
    this.getQuestionList();
  }
};
</script>

<style lang='less'>
.quesBox {
  // 文本框
  .el-form-item {
    padding-bottom: 24px;
    //文本label
    .el-form-item__label {
      padding-left: 21px;
      padding-right: 31px;
    }
    //输入框
    .formItem {
      width: 150px;
    }
  }
  //标题框
  .mytitle {
    width: 388px;
  }
  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>