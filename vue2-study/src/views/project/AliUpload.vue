<template>
  <div class="container">
    <!-- 文件拖拽上传区域 -->
    <div
      class="drag-upload"
      @dragenter="handleDragenter"
      @dragover="handleDragover"
      @drop="handleDrop"
    >
      <div><i class="el-icon-upload"></i>将目录或多个文件拖拽到此进行扫描</div>
      <div>支持的文件类型：.jpg .jpeg .png .gif .webp</div>
      <div>每个文件允许的最大尺寸： 2MB</div>
    </div>
    <input
      ref="fileUpload"
      type="file"
      class="ipt-upload"
      title=""
      multiple
      @change="uploadChange"
    />
    <input
      ref="directoryUpload"
      type="file"
      class="ipt-upload"
      title=""
      multiple
      webkitdirectory
      @change="uploadChange"
    />
    <!-- 点击按钮上传区域 -->
    <div class="btn-upload">
      <el-button type="primary" @click="clickUpload(false)">选择文件</el-button>
      <el-button type="primary" @click="clickUpload(true)"
        >选择文件夹</el-button
      >
    </div>
    <!-- 上传文件信息表格 -->
    <el-table
      class="table-upload"
      cell-class-name="table-cell"
      :data="tableData"
      :border="true"
      style="width: 100%"
      max-height="330"
      @row-click="handleRowClick"
    >
      <el-table-column
        prop="name"
        label="文件名"
        class-name="filename"
      ></el-table-column>
      <el-table-column prop="type" label="类型" width="110"></el-table-column>
      <el-table-column
        prop="size"
        label="大小"
        width="110"
        :formatter="cellFormatter"
      ></el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="{ row }">
          <el-tag v-if="row.status === 0">待上传</el-tag>
          <el-progress
            v-else-if="row.status === 1 || row.status === 2"
            :percentage="row.percentage"
          ></el-progress>
          <el-tag v-else-if="row.status === 3" type="success">已上传</el-tag>
          <el-tag v-else-if="row.status === -1" type="danger">上传失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="setting"
        label="操作"
        class-name="setting"
        width="180"
      >
        <template #default="{ row }">
          <el-button
            v-if="row.status === -1"
            @click="handleReUpload(row)"
            type="text"
            size="small"
            icon="el-icon-refresh-left"
          >
          </el-button>
          <el-button
            v-if="row.status === 1"
            @click="handlePause(row)"
            type="text"
            size="small"
            icon="el-icon-video-pause"
          >
          </el-button>
          <el-button
            v-if="row.status === 2"
            @click="handlePlay(row)"
            type="text"
            size="small"
            icon="el-icon-video-play"
          >
          </el-button>
          <el-button
            @click="handleView(row)"
            type="text"
            size="small"
            icon="el-icon-search"
          >
          </el-button>
          <el-button
            @click="handleDelete(row.uid)"
            type="text"
            size="small"
            icon="el-icon-delete"
          >
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <i class="el-icon-takeaway-box"></i>
        <div>没有数据</div>
      </template>
    </el-table>
    <!-- 上传文件信息标签 -->
    <div class="tags">
      <el-tag type="info">文件数量：{{ fileNum }}</el-tag>
      <el-tag type="success">成功上传： {{ successNum }}</el-tag>
      <el-tag type="info">总大小：{{ totalSizeDisplay }} </el-tag>
    </div>
    <!-- 翻页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      style="text-align: right;"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="fileNum"
      :hide-on-single-page="true"
      @current-change="currentChange"
    >
    </el-pagination>
    <!-- 上传按钮 -->
    <el-button type="primary" @click="handleUpload">开始上传</el-button>
    <!-- 图片预览dialog -->
    <el-dialog :visible.sync="dialogVisible">
      <img :src="viewSrc" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDirectory: false, // 上传是否为文件夹模式
      currentPage: 1,
      pageSize: 4,
      fileNum: 0, // 文件总数量
      totalSize: 0,
      tableData: [], // 用于table展示的文件信息
      legalNum: 0, // 不合法文件数量
      tempIndex: 0, // 用于生成文件唯一标识uid
      timeId4File: 0,
      timeId4Msg: 0,
      dialogVisible: false,
      viewSrc: '',
      // 所有上传文件信息
      uploadInfo: [
        // {
        //   filename: '124234.jpg',
        //   filetype: 'image/jpeg',
        //   filesize: 2345,
        //   status: 0
        // },
        // {
        //   filename: '9478345345.png',
        //   filetype: 'image/png',
        //   filesize: 23345,
        //   status: 1
        // },
        // {
        //   filename: '2342525.gif',
        //   filetype: 'image/gif',
        //   filesize: 5445565,
        //   status: 2
        // },
        // {
        //   filename: '5452525.gif',
        //   filetype: 'image/gif',
        //   filesize: 54545,
        //   status: 3
        // }
      ]
    }
  },
  computed: {
    // 文件总大小
    totalSizeDisplay() {
      return this.fileSizeFormatter(this.totalSize)
    },
    // 成功上传文件数量
    successNum() {
      return this.uploadInfo.reduce((prev, current) => {
        if (current.status === 3) {
          prev = prev + 1
        }
        return prev
      }, 0)
    }
  },
  methods: {
    handlePlay(item) {
      console.log('断点续传。。', item)
    },
    // 暂停上传
    handlePause(item) {
      item.abort()
      item.status = 2
    },
    // 手动重新上传
    handleReUpload(item) {
      item.abort = this.upload(
        item.raw,
        progress => {
          item.percentage = progress
        },
        res => {
          if (res.code === 200) {
            item.status = 3
          } else {
            // 上传失败
            item.status = -1
          }
        }
      )
    },
    handleUpload() {
      console.log(this.uploadInfo)
      // 遍历文件信息uploadInfo，每个文件单独进行上传
      this.uploadInfo.forEach(item => {
        if (item.status === 0) {
          item.status = 1
          item.abort = this.upload(
            item.raw,
            progress => {
              item.percentage = progress
            },
            res => {
              if (res.code === 200) {
                item.status = 3
              } else {
                // 上传失败
                item.status = -1
              }
            }
          )
        }
      })
    },

    /**
     * @description 上传文件方法
     * @param {File} file 文件信息对象
     * @param {Function} onProgress 传递文件上传进度回调
     * @param {Function} onFinish 文件上传结束回调
     * @returns {Function} 停止文件上传方法
     */
    upload(file, onProgress, onFinish) {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/my-web/upload')
      // 封装请求对象
      const formData = new FormData()
      formData.append('avatar', file)
      // 监听进度
      xhr.upload.onprogress = function(res) {
        // 计算进度
        const progress = Math.round((res.loaded / res.total) * 100)
        onProgress(progress)
      }
      // 监听请求结束事件
      xhr.onloadend = function() {
        if (xhr.status === 200) {
          // 成功
          onFinish(JSON.parse(xhr.responseText))
        } else {
          // 失败
          onFinish({ code: 400 })
        }
      }
      xhr.send(formData)
      return () => {
        xhr.abort()
      }
    },
    handleRowClick(row) {
      // 单击一行，显示该行信息
      console.log(row)
    },
    // 图片预览
    handleView(row) {
      this.dialogVisible = true
      this.viewSrc = row.url
    },

    // 删除文件
    handleDelete(id) {
      // debugger
      const index = this.uploadInfo.findIndex(item => item.uid === id)
      this.uploadInfo.splice(index, 1)
      this.afterFileChange()
    },

    /**
     * @description 阻止默认事件，使其成为可拖拽目标
     * @param {Event} e
     */
    handleDragenter(e) {
      e.preventDefault()
    },
    handleDragover(e) {
      e.preventDefault()
    },
    handleDrop(e) {
      e.preventDefault()
      // 遍历对象列表，获取所有文件，然后添加文件
      // eslint-disable-next-line no-unused-vars
      for (const item of event.dataTransfer.items) {
        this.scanFiles(item.webkitGetAsEntry())
      }
    },

    // 扫描获取文件
    scanFiles(entry) {
      if (entry.isDirectory) {
        // 递归读取文件
        const directoryReader = entry.createReader()
        directoryReader.readEntries(entries => {
          entries.forEach(entry => {
            this.scanFiles(entry)
          })
        })
      } else {
        // 直接添加文件
        entry.file(f => {
          this.addFile(f)
        })
      }
    },
    /**
     * @deprecated 当前页码改变函数：用于分页展示表格数据
     * @param {number} pageIndex 当前页
     */
    currentChange(pageIndex) {
      this.currentPage = pageIndex
      // 对表格数据uploadInfo进行裁剪
      // debugger
      const firstIndex = this.pageSize * (pageIndex - 1)
      this.tableData = this.uploadInfo.slice(
        firstIndex,
        firstIndex + this.pageSize
      )
      // tableData无数据，当前页码-1
      if (this.tableData.length === 0) {
        this.currentChange(this.currentPage - 1)
      }
    },

    /**
     * @description 通过按钮打开文件上传
     * @param {boolean} isDirectory 是否为文件夹模式上传
     */
    clickUpload(isDirectory) {
      if (isDirectory) {
        this.$refs.directoryUpload.value = null
        this.$refs.directoryUpload.click()
      } else {
        this.$refs.fileUpload.value = null
        this.$refs.fileUpload.click()
      }
    },
    /**
     * @description 文件状态改变
     */
    uploadChange(e) {
      // 添加文件信息
      this.addFiles(e.target.files)
    },

    /**
     * @param {File} file 单个文件信息
     */
    addFile(file) {
      // 将选择的文件添加到上传文件信息uploadInfo中
      const index = file.name.lastIndexOf('.')
      const name = file.name.slice(0, index)
      const type = file.name.slice(index)
      // 进行判断
      const isLegal = this.isLegal(type, file.size)
      if (isLegal) {
        // 创建文件本地预览url
        const url = URL.createObjectURL(file)
        // 生成文件唯一标识uid
        const uid = '' + Date.now() + this.tempIndex++
        this.uploadInfo.push({
          uid,
          name,
          type,
          size: file.size,
          url,
          status: 0,
          percentage: 0,
          raw: Object.assign(file, { uid })
        })
        this.afterFileChange()
      } else {
        this.legalNum++
        if (this.timeId4Msg) {
          clearTimeout(this.timeId4Msg)
        }
        this.timeId4Msg = setTimeout(() => {
          this.$message.error(`共${this.legalNum}个文件类型或大小不合法！`)
        }, 200)
      }
    },

    /**
     * @param {FileList} fileList 文件列表信息
     */
    addFiles(fileList) {
      // 将选择的文件添加到上传文件信息uploadInfo中
      fileList.forEach(item => {
        this.addFile(item)
      })
    },

    // 根据文件信息变化，设置其他信息
    afterFileChange() {
      if (this.timeId4File) {
        clearTimeout(this.timeId4File)
      }
      this.timeId4File = setTimeout(() => {
        console.log('afterFileChange')
        this.totalSize = this.uploadInfo.reduce(
          (prev, current) => (prev += current.size),
          0
        )
        this.fileNum = this.uploadInfo.length
        this.currentChange(this.currentPage)
      }, 200)
    },

    /**
     * @description 判断待上传文件是否合法
     * @param {string} type
     * @param {number} size
     * @returns {boolean}
     */
    isLegal(type, size) {
      const types = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      if (!types.includes(type) || size > 200 * 1024 * 1024) {
        return false
      } else {
        return true
      }
    },
    // 表格列格式化处理函数
    cellFormatter(_, __, cellValue) {
      return this.fileSizeFormatter(cellValue)
    },
    // 对文件大小进行格式化处理
    fileSizeFormatter(value) {
      // 显示单位 B KB MB GB, 相邻单位间换算都为1024倍
      const unit = ['B', 'KB', 'MB', 'GB']
      let level = 0
      while (value >= 1024) {
        value /= 1024
        level++
      }
      // 四舍五入，并加上单位
      value = Math.round(value * 100) / 100
      return `${value} ${unit[level]}`
    }
  },
  beforeDestory() {
    URL.revokeObjectURL()
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px 50px;
  text-align: left;

  > div {
    margin-bottom: 20px;
  }

  .drag-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 230px;
    font-size: 16px;
    color: #909399;
    border: 1px dashed #d9d9d9;
    background-color: #fff;

    &:hover {
      border-color: #409eff;
    }

    > div {
      margin-bottom: 30px;
    }

    :first-child {
      vertical-align: middle;
      margin-bottom: 8px;
    }

    .el-icon-upload {
      font-size: 50px;
      margin-right: 18px;
    }
  }

  .ipt-upload {
    display: none;
    // height: 0;
    // opacity: 0;
  }

  .table-upload {
    ::v-deep .el-table__empty-text {
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .el-icon-takeaway-box {
        display: block;
        font-size: 50px;
      }
    }

    ::v-deep .table-cell {
      border: 0;
    }

    ::v-deep .setting {
      i {
        font-size: 26px;
      }
    }

    ::v-deep .filename {
      .cell {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .tags {
    .el-tag {
      margin-right: 10px;
    }
  }
}
</style>
