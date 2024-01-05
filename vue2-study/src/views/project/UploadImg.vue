<template>
  <div style="width: 800px">
    <el-card class='box-card'>
      <div slot="header" class="clearfix">
        <span>图片上传</span>
      </div>
      <div>
        <el-upload
          action="#"
          ref="upload"
          list-type="picture-card"
          :file-list="fileList"
          :http-request="httpResHandler"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePreview"
          :on-progress="handleProgress">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  methods: {
    httpResHandler() {
      console.log('httpResHandler')
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleProgress(file) {
      console.log(file, 'handleProgress')
    },
    handlePreview(file) {
      console.log(file, 'handlePreview')
    },
    handleRemove(file) {
      console.log(file, 'handleRemove')
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file, 'handleDownload')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>

</style>
