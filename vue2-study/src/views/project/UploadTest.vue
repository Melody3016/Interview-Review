<template>
  <div>
    <el-form ref="ruleForm" label-width="80px">
      <el-form-item>
        <!--增加on-change和on-remove的钩子,el-upload里面绑定一个占位class：-->
        <el-upload
          action="#"
          list-type="picture-card"
          :class="{hide:hideUpload}"
          :file-list="file_list"
          :http-request="handleUpload"
          :on-change="handleChange"
          :on-remove="handleRemove"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="fileRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" center width="40%">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      file_list: []
    }
  },
  computed: {
    hideUpload() {
      return this.file_list.length >= 1
    }
  },
  methods: {
    handleUpload(file) {
      console.log(file, 'handleUpload')
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.file_list = [
        {
          name: file.name,
          url: file.url
        }
      ]
    },
    handleRemove(file, fileList) {},
    fileRemove(file, fileList) {
      this.file_list = []
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  },
  mounted() {
    setTimeout(() => {
      this.file_list = [
        {
          name: 'test',
          url:
            'https://wx3.sinaimg.cn/mw2000/001tamZBgy1h82s3pa7gxj61900u0n3l02.jpg'
        }
      ]
    }, 500)
  }
}
</script>

<style scoped>
::v-deep .hide .el-upload--picture-card {
  display: none;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
</style>
