<template>
  <div class="addBox">
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop='rid' label="学科编号" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='name' label="学科名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.shortName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增学科的方法
import { addSubject } from "@/api/subject.js";
export default {
  data() {
    return {
      // 是否显示面板
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 表单数据源
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        shortName: "",  //学科简称
        intro: "",  //学科简介
        remark: ""  //学科备注
      },
      // 验证规则
      rules: {
        rid:[
          { required: true, message: '请输入学科编号', trigger: 'blur' }
        ],
        name:[
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ]
      }
    };
  },
  // 方法
  methods: {
    btnAdd() {
      this.$refs.form.validate((valid)=>{
        if(valid == true){
          // this.$message.success('新增成功')
          addSubject(this.form).then(response=>{
            // window.console.log(response)
            if(response.data.code==200){
              this.$message.success('新增成功');
              //隐藏新增面板
              this.dialogFormVisible=false;
              // 重置新增面板
              this.$refs.form.resetFields();
              this.form.shortName='';
              this.form.intro='';
              this.form.remark='';
              // 访问父组件调用方法刷新页面数据
              this.$parent.getSubjectData()
            }
          })
        }else{
          this.$message.error('新增失败')
        }
      })
    }
  }
};
</script>

<style lang='less'>
.addBox {
  // 头部
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c3fa, #1396f9);
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close{
      color: #fff;
    }
  }
  // 按钮
  .dialog-footer {
    text-align: center;
  }
}
</style>