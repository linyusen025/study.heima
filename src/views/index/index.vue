<template>
  <div class="index">
    <el-container class="box">
      <!-- 头部 -->
      <el-header>
        <!-- 左边 -->
        <div class="left">
          <i class="el-icon-s-fold" @click="isCollapse = !isCollapse"></i>
          <img src="../../assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <!-- 右边 -->
        <div class="right">
          <img :src="$store.state.userImg" alt />
          <span class="right_span">{{$store.state.username}}</span>
          <el-button @click="loginout" type="primary" size="mini">退出</el-button>
        </div>
      </el-header>
      <!-- 布局 -->
      <el-container class="contentbox">
        <!-- 左侧栏导航 -->
        <el-aside width="auto">
          <!-- :router=true 开启路由模式,以 index 作为 path 进行路由跳转 -->
          <el-menu :router="true" class="el-menu-vertical-demo" :collapse="isCollapse">
            <template v-for="(item, index) in child" >
              <el-menu-item :key="index" v-if='item.meta.roles.includes($store.state.role)' :index="item.meta.fullPath">
                <i :class="item.meta.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>
            <!-- <el-menu-item v-if="['管理员','老师'].includes($store.state.role)" index="/index/user">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item v-if="['管理员','老师','学生'].includes($store.state.role)" index="/index/question">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item v-if="['管理员'].includes($store.state.role)" index="/index/enterprise">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item v-if="['管理员'].includes($store.state.role)" index="/index/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>-->
          </el-menu>
        </el-aside>
        <!-- 右侧栏内容 -->
        <el-main>
          <!-- 子组件路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入封装好的首页方法
import { getLogout } from "@/api/index.js";
// 导入cookie
import { removeToken } from "@/utils/mytoken.js";

// 导入子路由组件
import child from "@/router/childRouter.js";

export default {
  data() {
    return {
      // 获取用户信息
      userInfo: "",
      // 获取用户头像
      userImg: "",
      // 是否折叠导航栏
      isCollapse: false,
      //生成导航栏的数据源
      child: child
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
          // 调用退出接口方法
          getLogout().then(response => {
            // window.console.log(response)
            if (response.data.code == 200) {
              // 删除cookie
              removeToken();
              // 跳转到登录页面
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
  // 进入页面获取用户信息
  // created() {
  //   // 判断是否携带cookie
  //   if (!getToken()) {
  //     // 就提示用户未登录
  //     this.$message.error("还未登录,请登录");
  //     // 跳转到登录页
  //     this.$router.push("/login");
  //     // 终止后续代码
  //     return;
  //   }
  //   // 调用方法
  //   getInfo().then(response => {
  //     // window.console.log(response)
  //     // 判断用户的token是否为真
  //     if (response.data.code == 200) {
  //       this.userInfo = response.data.data;
  //       //  拼接用户头像路径
  //       this.userImg = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;

  //     }else if(response.data.code == 206){
  //       // 提示用户token错误
  //       this.$message.error('token错误')
  //       // 跳转到登录页
  //       this.$router.push('/login')
  //     }
  //   });
  // }
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
// 左侧导航栏
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>