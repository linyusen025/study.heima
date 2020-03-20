<template>
  <div class="login">
    <div class="leftlogin">
      <!-- 头部 -->
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- element 表单 -->
      <el-form class="inputform" :rules="rules" ref="form" :model="form" label-width="0px">
        <!-- 请输入手机号 -->
        <el-form-item prop='phone'>
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 栅格 -->
        <el-form-item prop="logincode">
          <el-row>
            <el-col :span="16">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="logincode" @click='changeImg' :src="imageUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 协议 -->
        <el-form-item class="checkboxheight" prop="isCheck">
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="butclass" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="butclass" type="primary" @click="openregister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
    <!-- 使用register组件 -->
    <register ref="register" />
  </div>
</template>

<script>
// 导入register组件
import register from "./components/register.vue";
// 自定义验证
// 手机号
import {checkphone} from '@/utils/mycheck.js'
// let checkphone = (rule,value,callback)=>{
//   let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
//   if(reg.test(value)==true){
//     callback()
//   }else{
//     callback(new Error('手机格式不正确'))
//   }
// }
// 导入登录接口请求方法
import {getLogin} from '@/api/login.js'
// 导入token方法
import {setToken} from '@/utils/mytoken.js'

export default {
  data() {
    return {
      // 图形验证码路径
      imageUrl:process.env.VUE_APP_URL+ '/captcha?type=login&t='+Date.now(),
      form: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        logincode: "",
        // 复选框
        isCheck: []
      },

      // 表单验证属性
      rules: {
        // 手机号
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // 自定义验证
          { validator: checkphone, trigger: "blur" }
        ],
        // 密码验证,长度在6-10位数
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        // 验证码,长度在4位数
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4个", trigger: "blur" }
        ],
        // 复选框验证,必须为true
        isCheck: [
          {
            type: "array",
            required: true,
            message: "请阅读并选择",
            trigger: "change"
          }
        ]
      }
    };
  },

  // 注册register
  components: {
    register
  },
   
  //  方法
  methods: {
    // 点击图形切换图形码
    changeImg(){
      this.imageUrl=process.env.VUE_APP_URL+ '/captcha?type=login&t='+Date.now()
    },
    // 表单验证方法  访问dom表单里的validate((valid)=>{},如果为true就验证成功
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid == true) {
          // this.$message({
          //   message: "验证成功",
          //   type: "success"
          // });
          getLogin({
            phone:this.form.phone,
            password:this.form.password,
            code:this.form.logincode
          }).then(response=>{
            // window.console.log(response)
              this.$router.push('/index');
              // 再保存token 键值对形式
              // window.localStorage.setItem('heima',response.data.data.token)
              setToken(response.data.data.token)
          })
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    // 点击注册按钮访问注册组件
    openregister() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>


<style lang='less'>
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 弹性布局 */
  display: flex;
  /* 让两个盒子左右间隔相等 */
  justify-content: space-around;
  /* 让盒子上下间隔相等 */
  align-items: center;

  // 左边盒子
  .leftlogin {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    /* 设置内边距 */
    padding: 48px 42px 86px 42px;
    /* 内边距不会影响盒子的px */
    box-sizing: border-box;
    //  左边盒子title
    .title {
      display: flex;
      align-items: center;
      //   titleimg
      .titleimg {
        width: 22px;
        height: 17px;
      }
      //   titlename
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      //   titleline
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      //   titlelogin
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    // 左边盒子表单
    .inputform {
      margin-top: 29px;
    }
    // 验证图片
    .logincode {
      width: 100%;
      height: 40px;
    }
    // check
    .checkboxheight {
      .el-form-item__content {
        line-height: 20px;
      }
    }
    // 登录注册按钮
    .butclass {
      width: 100%;
    }
  }

  //   右边盒子
  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>