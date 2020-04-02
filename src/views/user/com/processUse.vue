<template>
  <div class="addBox">
    <el-dialog  :title="isUser ? '编辑用户' : '新增用户' " :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button >取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入新增&编辑的方法
import { apiAddUser, apiEditUser } from "@/api/use.js";

// 导入封装好的自定义验证手机号跟邮箱方法
import { checkphone, checkemail } from "@/utils/mycheck.js";

export default {
  data() {
    return {
      // 是否显示面板
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //   设置绑定一个title属性 为true就是编辑面板  false就是新增面板
      isUser: true,
      // 表单数据源
      form: {
        username: "", //用户名
        email: "", //邮箱
        phone: "", //手机号
        role_id: "", //角色
        status: "", //状态
        remark: "", //备注
        id:''
      },
      // 验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入邮箱名", trigger: "blur" },
          { validator: checkphone, required: true }
        ],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }],
        status:[],
        remark:[]
      }
    };
  },
  // 方法
  methods: {
    // 确定按钮
    btn() {
      //   判断是新增还是编辑  true 为编辑   false 为新增
      if (this.isUser == true) {
        // 编辑
        apiEditUser(this.form).then(response => {
          // window.console.log(response)
          if (response.data.code == 200) {
            // 提示用户
            this.$message.success("编辑成功");
            // 关闭面板
            this.dialogFormVisible = false;
            // 刷新页面数据
            this.$parent.getUserList();
          } else {
            this.$message.error(response.data.message);
          }
        });
      } else {
        // 新增
        apiAddUser(this.form).then(response => {
          // window.console.log(response)
          if (response.data.code == 200) {
            this.$message.success("新增成功");
            // 关闭新增面板
            this.dialogFormVisible = false;
            // 重置面板
            // this.$refs.form.resetFields();
            // (this.form.status = ""), (this.form.remark = "");
            // 刷新页面数据
            this.$parent.getUserList();
          } else {
            this.$message.error(response.data.message);
          }
        });
      }
    },
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