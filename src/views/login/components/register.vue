<template>
  <el-dialog class="userregister" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form"  ref='form'  :rules="rules">
      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="圆形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="7">
            <img class="codeimg" src="../../../assets/login_captcha.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="7">
            <el-button class="logincodeuser" >获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onsubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        logincode: ""
      },
      //   表单提交内容验证属性,
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "长度在11个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 10, message: "长度在6-10个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在4个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods:{
      onsubmit(){
        this.$refs.form.validate(valid=>{
            if(valid == true){
                this.$message({
                    message:'信息验证成功',
                    type:'success'
                })
            }else{
                this.$message.error('信息验证失败')
            }
        })
      }
  }
};
</script>

<style lang='less'>
.userregister {
  // title样式
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #01c5fb, #1396fd);
    padding: 0px;
    height: 53px;
    line-height: 53px;

    .el-dialog__title {
      color: #fff;
    }
  }

  //   图形码样式
  .imgbox {
    height: 41px;
    text-align: right;
    .codeimg {
      width: 143px;
      height: 41px;
    }
  }
  //   验证码样式
  .logincodeuser{
      width: 139px;
      height: 39px;
      text-align: center;
  }
  // footer居中
  .dialog-footer {
    text-align: center;
  }
}
</style>