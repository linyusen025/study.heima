<template>
  <div class="addBox">
    <el-dialog title="新增企业" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增学科的方法
import { apiAddEnterprise } from "@/api/enterprise.js";

export default {
  data() {
    return {
      // 是否显示面板
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 表单数据源
      form: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        remark: "" //企业备注
      },
      // 验证规则
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [{ required: true, message: "请输入企业简称", trigger: "blur" }],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }]
      }
    };
  },
  // 方法
  methods: {
    //   新增企业数据
    addEnt() {
      this.$refs.form.validate(valid => {
        if (valid == true) {
          apiAddEnterprise(this.form).then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              // 提示用户
              this.$message.success("新增成功");
              // 关闭新增面板
              this.dialogFormVisible = false;
              // 重置面板
              this.$refs.form.resetFields();
              this.remark='';
              // 刷新页面数据
              this.$parent.getEnterpriseList()
            }else{
              this.$message.error(response.data.message)
            }
          });
        }
      });
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
    .el-dialog__close {
      color: #fff;
    }
  }
  // 按钮
  .dialog-footer {
    text-align: center;
  }
}
</style>