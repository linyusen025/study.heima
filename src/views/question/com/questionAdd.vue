<template>
  <!-- fullscreen是否全屏显示面板,默认为false -->
  <!-- label-position靠左对齐 -->
  <el-dialog
    class="addBox"
    :fullscreen="true"
    :title="isQusetion ? '编辑' : '新增' "
    :visible.sync="dialogFormVisible"
  >
    <el-form ref="form" :rules="rules" label-position="left" class="addForm" :model="form">
      <!-- 学科 -->
      <el-form-item class="itemform" label="学科" :label-width="formLabelWidth" prop="subject">
        <subjectcom v-model="form.subject"></subjectcom>
      </el-form-item>
      <!-- 阶段 -->
      <el-form-item class="itemform" label="阶段" :label-width="formLabelWidth" prop="step">
        <el-select class="formItem" v-model="form.step" placeholder="请选择阶段">
          <!-- <el-option label="请选择" value></el-option> -->
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <!-- 企业 -->
      <el-form-item class="itemform" label="企业" :label-width="formLabelWidth" prop="enterprise">
        <enterprisecom v-model="form.enterprise"></enterprisecom>
      </el-form-item>
      <!-- 城市 -->
      <el-form-item class="itemform" label="城市" :label-width="formLabelWidth" prop="city">
        <mycity v-model="form.city"></mycity>
      </el-form-item>
      <!-- 题型 -->
      <el-form-item class="itemform" label="题型" :label-width="formLabelWidth" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 难度 -->
      <el-form-item class="itemform" label="难度" :label-width="formLabelWidth" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 题库试题 -->
      <el-form-item label="试题标题" :label-width="formLabelWidth" prop="title">
        <!-- 富文本编辑器 content是富文本编辑框中的内容 -->
        <quill-editor @change="titleChange($event)" :content="form.title"></quill-editor>
      </el-form-item>
      <!-- 出题区域 -->
      <!-- 单选 -->
      <el-form-item
        v-if="form.type==1"
        label="单选"
        :label-width="formLabelWidth"
        prop="single_select_answer"
      >
        <el-radio-group v-model="form.single_select_answer">
          <!-- 使用myvadio组件 -->
          <myradio
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @changetext="v=>{item.text=v}"
            @changeImg="v=>{item.image=v}"
            v-for="(item, index) in form.select_options"
            :key="index"
          ></myradio>
        </el-radio-group>
      </el-form-item>
      <!-- 多选 -->
      <el-form-item
        v-if="form.type==2"
        label="多选"
        :label-width="formLabelWidth"
        prop="multiple_select_answer"
      >
        <el-checkbox-group v-model="form.multiple_select_answer">
          <!-- 使用mycheckbox组件 -->
          <mycheckbox
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @changetext="v=>{item.text=v}"
            @changeImg="v=>{item.image=v}"
            v-for="(item, index) in form.select_options"
            :key="index"
          ></mycheckbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答 -->
      <el-form-item
        v-if="form.type==3"
        label="简答"
        :label-width="formLabelWidth"
        prop="short_answer"
      >
        <!-- 文本域 -->
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->
      <el-form-item label="解析视频" :label-width="formLabelWidth" prop="video">
        <myvideo v-model="form.video"></myvideo>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
        <!-- 富文本编辑器 content是富文本编辑框中的内容 -->
        <quill-editor @change="answerChange($event)" :content="form.answer_analyze"></quill-editor>
      </el-form-item>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 试题备注 -->
      <el-form-item label="试题备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>

      <!-- 底部按钮 -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="btn">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入myradio组件
import myradio from "./myradio.vue";
// 导入checkbox组件
import mycheckbox from "./mycheckbox.vue";
// 导入myvideo组件
import myvideo from "./myvideo.vue";
// 导入新增&编辑题库接口方法
import { apiAddQuestion, apiEditQuestion } from "@/api/question.js";
export default {
  data() {
    return {
      // 控制面板
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 设置面板title是新增还是编辑  true编辑 false新增
      isQusetion: true,
      // 表单
      form: {
        id:'',
        user_id:'',
        title: "", // 试题的标题
        subject: "", // 所属学科
        step: "", // 阶段： 1 初级 2 中级 3 高级
        enterprise: "", // 企业标识
        city: [], // 城市
        type: 1, // 类型
        difficulty: 1, // 难度 1简单 、2一般 、3困难
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简答
        video: "", // 视频路径
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        // 这个数据是单选 & 多选中的数据源：选项，介绍，图片介绍
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "../../../assets/13.jpg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      rules: {
        title: [{ required: true, message: "不能为空", trigger: "blur" }],
        subject: [{ required: true, message: "不能为空", trigger: "blur" }],
        step: [{ required: true, message: "不能为空", trigger: "blur" }],
        enterprise: [{ required: true, message: "不能为空", trigger: "blur" }],
        city: [{ required: true, message: "不能为空", trigger: "blur" }],
        type: [{ required: true, message: "不能为空", trigger: "blur" }],
        difficulty: [{ required: true, message: "不能为空", trigger: "blur" }],
        single_select_answer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        multiple_select_answer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        short_answer: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        answer_analyze: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        remark: [{ required: true, message: "不能为空", trigger: "blur" }],
        select_options: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        video: []
      }
    };
  },
  // 注册组件
  components: {
    myradio,
    mycheckbox,
    myvideo
  },
  // 方法
  methods: {
    btn() {
       // window.console.log(this.form)
      if (this.isQusetion == true) {
        // 编辑题库方法
        apiEditQuestion(this.form).then(response=>{
          // window.console.log(response)
          if(response.data.code==200){
            this.$message.success('编辑成功')
            // 关闭面板
            this.dialogFormVisible=false
            // 刷新页面数据
            this.$parent.getQuestionList()
          }else{
            this.$message.error(response.data.message)
          }
        })
      } else {
        // 新增题库方法
        apiAddQuestion(this.form).then(response => {
          // window.console.log(response)
          if (response.data.code == 200) {
            this.$message.success("新增题库成功");
            // 关闭面板
            this.dialogFormVisible = false;
            // 重置面板
            this.$refs.form.resetFields();
            // 刷新页面数据
            this.$parent.getQuestionList();
          } else {
            this.$message.error(response.data.message);
          }
        });
      }
    },
    // 当富文本编辑器里的内容改变时触发
    titleChange(e) {
      this.form.title = e.text;
    },
    // 答案改变时触发
    answerChange(e) {
      this.form.answer_analyze = e.text;
    }
  }
};
</script>

<style lang='less'>
.addBox {
  // 头部
  .el-dialog__header {
    background: linear-gradient(to right, #01c3fa, #1396f9);
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  //   表单区域
  .addForm {
    width: 836px;
    margin: 0 auto;
    .itemform {
      .el-form-item__content {
        .formItem {
          width: 364px;
        }
      }
    }
  }
  // 按钮
  .dialog-footer {
    text-align: center;
  }
}
</style>