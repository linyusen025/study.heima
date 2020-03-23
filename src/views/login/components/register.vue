<template>
  <el-dialog class="userregister" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item prop="photo" label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="imageUpload"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
            <img @click="changeImg" class="codeimg" :src="imgSrc" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col class="imgbox" :span="7">
            <el-button
              :disabled="time !== 0 "
              @click="getcode"
              class="logincodeuser"
            >{{time === 0 ? '获取用户验证码' : time}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="onsubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入axios
// import axios from 'axios'
// 输入封装好的注册获取短信验证码
// import { goCode, getRegister } from "../../../api/register.js";
// @相当于是src目录
import { goCode, getRegister } from "@/api/register.js";
// 声明自定义验证规则
// 手机号
import {checkphone,checkemail} from '@/utils/mycheck.js';
// let checkphone = (rule, value, callback) => {
//   // 正则表达式
//   let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//   if (reg.test(value) == true) {
//     callback();
//   } else {
//     callback(new Error("手机号格式不正确"));
//   }
// };
// 邮箱
// let checkemali = (rule, value, callback) => {
//   let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//   if (reg.test(value) == true) {
//     callback();
//   } else {
//     callback(new Error("邮箱格式不正确"));
//   }
// };
export default {
  data() {
    return {
      // 注册框不显示
      dialogFormVisible: false,
      formLabelWidth: "120px",
      // 圆形验证码
      // imgSrc:'http://127.0.0.1/heimamm/public'+ '/captcha?type=sendsms&tt='+ Date.now(),
      imgSrc:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&tt=" + Date.now(),
      // 设置获取短信计时器
      timer: null,
      // 获取短信时间
      time: 0,
      // 上传头像路径
      imageUpload: process.env.VUE_APP_URL + "/uploads",
      // 上传头像成功后显示
      imageUrl: null,
      // form表单
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        logincode: "",
        photo: ""
      },
      //   表单提交内容验证属性,
      rules: {
        photo: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          // 自定义验证
          { validator: checkemail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // 自定义验证
          { validator: checkphone, trigger: "blur" }
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
          { min: 4, max: 4, message: "长度在4个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 点击取消按钮,表单重置  resetFields()方法只能默认重置表单元素,图片信息不能重置
    cancel(){
      // 重置表单
      this.$refs.form.resetFields();
      // 重置图片信息
      this.imageUrl = null
      // 清除注册面板
      this.dialogFormVisible= false
    },
    // 点击确定按钮 注册信息验证
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid == true) {
          getRegister({
            username: this.form.nickname,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.photo,
            password: this.form.password,
            rcode: this.form.logincode
          }).then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              this.$message.success("注册成功");
              // 清除注册面板
              this.dialogFormVisible = false;
              // 重置表单
              this.$refs.form.resetFields();
              // 重置图片信息
              this.imageUrl = null
            } else {
              this.$message.error(response.data.message);
            }
          });
        } else {
          this.$message.error("信息验证失败");
        }
      });
    },
    // 点击图片切换验证码
    changeImg() {
      // 在线路径地址
      this.imgSrc =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&tt=" + Date.now();
    },
    // 点击获取短信验证码
    getcode() {
      //  axios({
      //    url: process.env.VUE_APP_PHONEURL +'/sendsms',
      //    method:'post',
      //    data:{
      //      code:this.form.code,
      //      phone:this.form.phone,
      //    },

      //   //  携带cookie解决跨域
      //    withCredentials: true
      //  }).then(response=>{
      //    window.console.log(response)
      //  })
      // 判断手机号是否合法
      let phonereg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phonereg.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }
      // 判断图形码是否合法
      if (this.form.code.trim().length !== 4) {
        this.$message.error("图形码不合法");
        return;
      }
      // 使用计时器
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 100);
      // 使用封装好的请求方法
      goCode({
        code: this.form.code,
        phone: this.form.phone
      }).then(response => {
        // window.console.log(response);
        if (response.data.code == 200) {
          this.$message.success("验证码:" + response.data.data.captcha);
        }else{
          this.$message.error(response.data.message)
        }
      });
    },
    // 上传组件
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传成功后赋值给form里的photo
      // window.console.log(res)
      this.form.photo = res.data.file_path;
      // 单独给photo验证
      this.$refs.form.validateField("photo");
    },
    beforeAvatarUpload(file) {
      // 判断图片的格式
      const isJPG =
        file.type === "image/jpeg" || "image/jpg" || "image/png" || "image/gif";
      // 判断图片的大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  .logincodeuser {
    width: 139px;
    height: 39px;
    text-align: center;
  }
  // 上传头像
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  // footer居中
  .dialog-footer {
    text-align: center;
  }
}
</style>