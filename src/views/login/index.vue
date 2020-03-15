<template>
  <div class="login">
    <div class="leftlogin">
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
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
  }

//   右边盒子
  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>