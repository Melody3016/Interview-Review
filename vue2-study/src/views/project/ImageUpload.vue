<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>使用element的upload组件</span>
      </div>
      <el-upload
        multiple
        action="/my-web/upload/multiple"
        class="upload-demo"
        name="picture"
        list-type="picture-card"
        ref="elUpload"
        :file-list="fileList"
        :disabled="false"
        :auto-upload="false"
        :limit="10"
        :on-exceed="exceedHandler"
        :on-preview="previewHandler"
        :on-remove="removeHandler"
        :on-success="successHandler"
        :on-error="errorHandler"
        :on-progress="progressHandler"
        :on-change="changeHandler"
        :before-upload="beforeUploadHandler"
        :before-remove="beforeRemoveHandler"
      >
        <i slot="default" class="el-icon-plus"></i>
        <!-- <div slot="file" slot-scope="{file}">
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
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div> -->
        <div slot="tip" class="el-upload__tip">最多只能上传10个文件，且单个大小不超过2MB</div>
      </el-upload>
      <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
      <p class="desc">
        使用element的upload组件上传文件
      </p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>原生input上传（本地预览）</span>
      </div>
      <input type="file" name="" id="iptUploadSingle"><br><br>
      <div class="box">
        <img width="80px" v-if="iptUploadSingleUrl" :src="iptUploadSingleUrl" alt="上传图片预览">
      </div><br><br>
      <input type="file" name="" id="iptUploadMultiple" multiple><br><br>
      <div class="box">
        <img
          width="80px"
          alt="上传图片预览"
          v-for="item in iptUploadMultipleUrl"
          :key="item.name"
          :src="item.url"
        >
      </div><br><br>
      <button @click="clickHandler1">提交</button>
      <p class="desc">
        使用原生input标签选择文件，使用XHR对象手动发送请求上传
      </p>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>原生表单上传</span>
      </div>
      <form action="http://localhost:4000/my-web/upload/multiple" method="POST" enctype="multipart/form-data">
        <input type="file" name="avatar" id=""><br><br>
        <input type="file" name="boop" id="" multiple><br><br>
        <input type="file" name="scenery" id="" multiple><br><br>
        <input type="submit" value="提交">
      </form>
      <p class="desc">
        最简单的文件上传方式，通过设置enctype属性为"multipart/form-data"，文件会被表单编码成form-data格式，发送给后端服务器。
        使用form表单提交会刷新页面，因此基本不使用
      </p>
    </el-card>
  </div>
</template>

<script>
import tempSvg from '@/assets/images/active.png'
export default {
  data() {
    return {
      iptUploadSingleUrl: '',
      iptUploadMultipleUrl: [],
      iptUploadSingleFile: {},
      iptUploadMultipleFiles: [],
      fileList: [
        {
          name: 'photo_2022-09-08_00-39-28_3720.jpg',
          url: 'http://localhost:4000/uploads/2023223/photo_2022-09-08_00-39-28_3720.jpg'
        },
        {
          name: 'QQ截图20221015194246_3507.png',
          url: 'http://localhost:4000/uploads/2023223/QQ截图20221015194246_3507.png'
        },
        {
          name: 'word文档.doc',
          url: tempSvg
        }
      ]
    }
  },
  methods: {
    addEvent() {
      const iptSingleEle = document.getElementById('iptUploadSingle')
      const iptMultipleEle = document.getElementById('iptUploadMultiple')

      iptSingleEle.addEventListener('change', () => {
        // 生成本地图片预览路径
        this.iptUploadSingleFile = iptSingleEle.files[0]
        console.log('this.iptUploadSingleFile', this.iptUploadSingleFile)
        const file = this.iptUploadSingleFile
        var reader = new FileReader()
        reader.addEventListener("load", (e) => {
          this.iptUploadSingleUrl = e.target.result
        }, false)

        if (file) {
          reader.readAsDataURL(file)
        }
      })
      iptMultipleEle.addEventListener('change', () => {
        this.iptUploadMultipleUrl = []
        this.iptUploadMultipleFiles = iptMultipleEle.files
        console.log('this.iptUploadMultipleFiles', this.iptUploadMultipleFiles)
        // 生成本地图片预览路径
        const files = this.iptUploadMultipleFiles
        // eslint-disable-next-line no-unused-vars
        for (const file of files) {
          var reader = new FileReader()
          reader.addEventListener("load", (e) => {
            this.iptUploadMultipleUrl.push({
              name: file.name,
              url: e.target.result
            })
          }, false)

          if (file) {
            reader.readAsDataURL(file)
          }
        }
      })
    },
    clickHandler1() {
      const iptSingleEle = document.getElementById('iptUploadSingle')
      const iptMultipleEle = document.getElementById('iptUploadMultiple')
      // 封装请求数据
      const data = new FormData()
      data.append('avatar', this.iptUploadSingleFile)
      // eslint-disable-next-line no-unused-vars
      for (const file of this.iptUploadMultipleFiles) {
        data.append('scenery', file)
      }
      /* // 使用原生ajax发送上传请求
      // 1. 创建xhr对象
      const xhr = new XMLHttpRequest()
      // 2. 设置请求方式和地址
      xhr.open('POST', '/my-web/upload/multiple')
      // 3. 设置请求头
      // xhr.setRequestHeader('Content-type', 'multipart/form-data')
      // 4. 发送请求，携带请求数据
      xhr.send(data)
      // 5. 监听响应事件
      // xhr.onload((res) => {
      //   console.log(res)
      // })
      xhr.onload = (e) => {
        console.log(JSON.parse(e.target.responseText))
        // 清除input数据
        // 可以清除，但不会触发change事件
        // eslint-disable-next-line no-self-assign
        // iptSingleEle.outerHTML = iptSingleEle.outerHTML
        iptSingleEle.value = ''
        iptMultipleEle.value = ''
        this.iptUploadSingleUrl = ''
        this.iptUploadMultipleUrl = []
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      } */
      // 使用fetch发送上传请求
      fetch('/my-web/upload/multiple', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          iptSingleEle.value = ''
          iptMultipleEle.value = ''
          this.iptUploadSingleUrl = ''
          this.iptUploadMultipleUrl = []
          this.$message({
            message: '上传成功！',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
        })
    },
    // 文件预览
    handlePictureCardPreview(file) {
      console.log('handlePictureCardPreview ---> file', file)
    },
    // 文件删除
    handleRemove(file) {
      console.log('handleRemove ---> file', file)
      // 将file从fileList删除
      // const findIndex = this.fileList.findIndex(item => item.)
    },
    // 手动上传文件
    submitUpload() {
      // 上传行为等同自动上传，需要在钩子函数中去获取上传结果以及进行相应操作
      this.$refs.elUpload.submit()
    },
    // 覆盖自定义上传，需设置自动上传才会触发
    uploadHandler(config) {
      console.log('uploadHandler ---> config', config)
      const url = config.action
      // 封装上传数据
      const data = new FormData()
      data.append(config.filename, config.file)
      // 使用fetch自定义上传文件
      fetch(url, {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          config.onSuccess(res)
        })
        .catch(e => {
          config.onError(e)
        })
    },
    // 文件超出个数限制时的钩子， file为待上传的原始file文件集合，fileList为已上传的封装file文件集合
    exceedHandler(file, fileList) {
      console.log('exceedHandler ---> file', file)
      console.log('exceedHandler ---> fileList', fileList)
      console.log('=============================================')
      this.$message({
        message: '上传文件数量超出限制！',
        type: 'error'
      })
    },
    // 点击文件列表中已上传的文件时的钩子
    previewHandler(file) {
      console.log('previewHandler ---> file', file)
      console.log('=============================================')
    },
    // 文件列表移除文件时的钩子
    removeHandler(file, fileList) {
      console.log('removeHandler ---> file', file)
      console.log('removeHandler ---> fileList', fileList)
      console.log('=============================================')
    },
    // 文件上传成功时的钩子
    successHandler(response, file, fileList) {
      this.fileList = fileList.slice()
      console.log(this.fileList)
      console.log('successHandler ---> response', response)
      console.log('successHandler ---> file', file)
      console.log('successHandler ---> fileList', fileList)
      console.log('=============================================')
    },
    // 文件上传失败时的钩子
    errorHandler(err, file, fileList) {
      console.log('errorHandler ---> err', err)
      console.log('errorHandler ---> file', file)
      console.log('errorHandler ---> fileList', fileList)
      console.log('=============================================')
    },
    // 文件上传时的钩子，上传中一直会触发调用，显示实时上传进度
    progressHandler(event, file, fileList) {
      console.log('progressHandler ---> event', event)
      console.log('progressHandler ---> file', file)
      console.log('progressHandler ---> fileList', fileList)
      console.log('=============================================')
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    changeHandler(file, fileList) {
      console.log('changeHandler ---> file', file)
      console.log('changeHandler ---> fileList', fileList)
      console.log('=============================================')
    },
    // 上传文件之前的钩子，参数为原始的上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUploadHandler(file) {
      console.log('beforeUploadHandler ---> file', file)
      console.log('=============================================')
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemoveHandler(file, fileList) {
      console.log('beforeRemoveHandler ---> file', file)
      console.log('beforeRemoveHandler ---> fileList', fileList)
      console.log('=============================================')
    }
  },
  mounted() {
    this.addEvent()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin-bottom: 20px;
  margin-right: 18px;

  ::v-deep .upload-demo {
    margin-bottom: 20px;

    .el-upload-list__item,
    .el-upload--picture-card {
      width: 80px;
      height: 80px;
    }
    .el-upload--picture-card {
      line-height: 86px;
    }
  }
  .desc {
    font-size: 14px;
    text-indent: 2ex;
    padding: 20px 0;
  }
}
</style>
