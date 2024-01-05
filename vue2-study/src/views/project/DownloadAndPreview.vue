<template>
  <div id="box">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>反馈详情</span>
      </div>
      <div class="container">
        <el-row class="con">
          <div class="title">反馈内容</div>
          <div>同意本政策。</div>
        </el-row>
          <el-row class="con">
            <div class="title">附件</div>
            <div class="list">
              <el-skeleton style="width: 458px;" animated :loading="loading" :count="3" :throttle="100">
                <!-- 骨架屏 -->
                <template slot="template">
                  <div
                    style="padding-top: 10px; display: flex; align-items: center; justify-content: space-around; justify-items: space-between;"
                  >
                    <el-skeleton-item variant="text" style="width: 75%;"></el-skeleton-item>
                    <el-skeleton-item variant="text" style="width: 8%;"></el-skeleton-item>
                    <el-skeleton-item variant="text" style="width: 8%;"></el-skeleton-item>
                  </div>
                </template>
                <!-- 真实UI -->
                <template>
                  <el-row
                    v-for="(item, index) in fileList"
                    :key="index"
                  >
                    <el-col :span="20">
                      <i class="el-icon-document"></i>
                      <span>{{ item.fileName }}</span>
                    </el-col>
                    <el-col :span="2">
                      <div class="link" @click="download(item.fileName, item.filePath)">下载</div>
                    </el-col>
                    <el-col :span="2">
                      <div class="link" @click="preview(item.fileName, item.fileShowPath, item.fileType)">预览</div>
                    </el-col>
                    <el-divider></el-divider>
                  </el-row>
                </template>
              </el-skeleton>
            </div>
          </el-row>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogVisible" width="70%" @close="dialogCloseHandler" title="图片预览">
      <h2> {{ dialogName }} </h2>
      <el-divider></el-divider>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-dialog
      width="70%"
      title="PDF预览"
      custom-class="pdfDialog"
      :fullscreen="false"
      :visible.sync="pdfDialogVisible"
      @close="dialogCloseHandler"
    >
      <h2> {{ dialogName }} </h2>
      <el-divider></el-divider>
      <!-- 使用HTML标签 -->
      <!-- <iframe style="flex: 1; width: 100%" :src="dialogPDFUrl"></iframe> -->
      <!-- <embed style="flex: 1; width: 100%" type="application/pdf" :src="dialogPDFUrl" /> -->
      <!-- <object style="flex: 1; width: 100%" type="application/pdf" :data="dialogPDFUrl" ></object> -->
      <!-- 使用PDF.js -->
      <iframe style="flex: 1; width: 100%" :src="'../../static/pdf/web/viewer.html?file=' + dialogPDFUrl"></iframe>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      dialogName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      dialogPDFUrl: '',
      pdfDialogVisible: false,
      fileList: []
    }
  },
  methods: {
    fetchFileInfo() {
      setTimeout(() => {
        const res = [
          {
            fileName: '2054345.jpg',
            filePath: 'http://localhost:8080/upload/2054345.jpg',
            fileShowPath: 'http://localhost:8080/upload/2054345.jpg',
            fileSize: '',
            fileType: 'image/jpeg'
          },
          {
            fileName: '2055472.jpg',
            filePath: 'http://localhost:8080/upload/2055472.jpg',
            fileShowPath: 'http://localhost:8080/upload/2055472.jpg',
            fileSize: '',
            fileType: 'image/jpeg'
          },
          {
            fileName: '柯南主线剧情集数.pdf',
            filePath: 'http://localhost:8080/upload/柯南主线剧情集数.pdf',
            fileShowPath: 'http://localhost:8080/upload/柯南主线剧情集数.pdf',
            fileSize: '',
            fileType: 'application/pdf'
          },
          {
            fileName: 'loading.gif',
            filePath: 'http://localhost:8080/upload/loading.gif',
            fileShowPath: 'http://localhost:8080/upload/loading.gif',
            fileSize: '',
            fileType: 'image/gif'
          },
          {
            fileName: 'active.png',
            filePath: 'http://localhost:8080/upload/active.png',
            fileShowPath: 'http://localhost:8080/upload/active.png',
            fileSize: '',
            fileType: 'image/png'
          }
        ]
        this.fileList = res
        this.loading = false
      }, 500)
    },
    download(fileName, filePath) {
      /*
        文件下载：
          1：创建一个a标签
          2：设置文件下载路径，将a的href属性设为filePath
          3：设置文件下载名称，将a的download属性设为fileName
          4：设置a标签的样式，使其不可见
          5：将a标签添加到body中
          6：手动调用a的click事件
          7：将a标签从body中移除
      */
      const aTag = document.createElement('a')
      aTag.href = filePath
      aTag.download = fileName
      aTag.style.display = 'none'
      document.body.appendChild(aTag)
      aTag.click()
      document.body.removeChild(aTag)
    },
    preview(fileName, fileShowPath, fileType) {
      if (fileType.startsWith('image/')) {
        /*
          图片预览：
            1. 设置预览图片信息（路径，名称等）
            2. 将控制对话框展示变量dialogVisible设置true可见
            3. 关闭对话框进行变量重置操作（dialogVisible会通过 .sync修饰符 自动设为false)
        */
        this.dialogImageUrl = fileShowPath
        this.dialogName = fileName
        this.dialogVisible = true
      } else if (fileType.endsWith('/pdf')) {
        /*
          pdf预览：
            1. 使用HTML标签 （iframe、embed、object）
            2. 使用第三方插件库 （PDF.js、PDFObject）
            3. PDF文件转化成图片进行展示 （无法复制）
        */
        // 1. 使用HTML标签
        this.dialogPDFUrl = fileShowPath
        this.dialogName = fileName
        this.pdfDialogVisible = true
        // 2. 使用pdf.js
        window.open('../../static/pdf/web/viewer.html?file=' + fileShowPath)
      }
    },
    dialogCloseHandler() {
      // 预览窗口关闭时重置
      this.dialogName = ''
      this.dialogImageUrl = ''
      this.dialogPDFUrl = ''
    }
  },
  mounted() {
    // 发送请求，获取文件信息
    this.fetchFileInfo()
  }
}
</script>

<style lang="scss" scoped>
#box {
  width: 600px;
  margin: 100px auto;
  text-align: left;

  .container {
    padding: 10px 50px;

    .con {
      margin-bottom: 30px;

      .title {
        color: darkgray;
        margin-bottom: 8px;
      }
      .list {

        ::v-deep .el-icon-document {
          margin-right: 5px;
        }
        .link {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
  }

  ::v-deep .pdfDialog {
    height: 75vh;
    display: flex;
    flex-direction: column;

    .el-dialog__body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
