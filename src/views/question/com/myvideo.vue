<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
    </el-upload>
    <!-- 添加一个容器来保存视频播放 controls控制视频显示隐藏 loop循坏播放 -->
    <video style="width:300px;height:150px" v-if="moveUrl" :src="moveUrl" controls loop></video>
  </div>
</template>

<script>
export default {
  // 接收传递过来的值
  props:['value'],
  data() {
    return {
      // 视频上传路径
      uploadUrl: process.env.VUE_APP_URL + "/question/upload",
      // 视频上传唱歌的路径
      moveUrl: ""
    };
  },
  methods: {
    // 上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      this.moveUrl = URL.createObjectURL(file.raw);
      // 得到修改后的图片地址
        var imgPath = res.data.url;
      // 当图片上传成功之后，应该将修改后的图片数据发送给外界的 select_options 中的 images 里
        this.$emit("input", imgPath);
    },
    // 上传之前的回复调用函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 8;

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

<style>
</style>