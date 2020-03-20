<template>
  <div class="index">
    <el-container class="box">
      <!-- 头部 -->
      <el-header>
        <!-- 左边 -->
        <div class="left">
          <i class="el-icon-s-fold"></i>
          <img src="../../assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <!-- 右边 -->
        <div class="right">
          <img :src="userImg" alt />
          <span class="right_span">{{userInfo.username}}</span>
          <el-button @click="loginout" type="primary" size="mini">退出</el-button>
        </div>
      </el-header>
      <!-- 布局 -->
      <el-container class="contentbox">
        <!-- 左侧栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右侧栏 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入封装好的首页方法
import { getInfo } from "@/api/index.js";
// 导入cookie
import {removeToken} from '@/utils/mytoken.js'
export default {
  data() {
    return {
      // 获取用户信息
      userInfo: "",
      // 获取用户头像
      userImg: ""
    };
  },
  // 方法
  methods: {
    //  退出登录
    // 调用$confirm()
    loginout() {
      this.$confirm("你确定要退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 删除cookie
          removeToken();
          // 跳转到登录页面
          this.$router.push('/login');
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  },
  // 进入页面获取用户信息
  created() {
    // 调用方法
    getInfo().then(response => {
      // window.console.log(response)
      this.userInfo = response.data.data;
      //  拼接用户头像路径
      this.userImg = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
    });
  }
};
</script>

<style lang='less'>
// 整个页面
.index,
.box,
.contentbox {
  height: 100%;
}
// 头部
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //    左边
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      margin-right: 9px;
      border-radius: 50%;
    }
    .right_span {
      font-size: 14px;
      margin-right: 38px;
    }
  }
}
// 左侧栏
.el-aside {
  background-color: #fff;
  color: #333;
}
// 右侧栏
.el-main {
  background-color: #e8e9ec;
  color: #333;
}
</style>