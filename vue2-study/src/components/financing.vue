<template>
  <div class="display-from">
    <section class="itemInfo">
      <el-form :model="info" :rules="infoFromRules" ref="ruleForm" label-width="110px">
        <div class="addfin-rongzi">
          <div class="financing-item">
            <h1>融资要素</h1>
            <el-form-item label="融资限额(万)" prop="financingLimit">
              <el-input v-model="info.financingLimit" placeholder="请输入" :disabled="isView" />
            </el-form-item>

            <el-form-item label-width="20px" prop="financingLimit">
              <!-- <llsCheckboxGroup v-model="Checkbox" @change="changeCheckbox" title>
                <llsCheckbox label="Y" :disabled="Checkdisabled">无限额</llsCheckbox>
              </llsCheckboxGroup> -->
              <el-checkbox v-model="checkbox" label="Y" :disabled="Checkdisabled" @change="changeCheckbox">备选项</el-checkbox>
            </el-form-item>

            <el-form-item label="融资期限(天)" prop="financingPeriod">
              <el-input v-model="info.financingPeriod" placeholder="请输入" :disabled="isView" />
            </el-form-item>
          </div>

          <div class="financing-item-req">
            <el-form-item label="资方要求">
              <el-input
                v-model="info.lendRequire"
                placeholder="请输入(限制50字)"
                maxlength="50"
                :disabled="isView"
              />
            </el-form-item>
            <div
              class="financing-icon"
              v-for="(item) in info.accessRequireList"
              :key="item.id"
            >
              <el-form-item label="准入要求">
                <el-input
                  v-model="item.accessRequire"
                  placeholder="请输入(限制50字)"
                  maxlength="50"
                  :disabled="isView"
                />
                <el-button class="reduction add" icon="el-icon-plus" @click="addfin" type="text"></el-button>
                <el-button
                  class="reduction"
                  icon="el-icon-minus"
                  @click="delFin(item.id)"
                  type="text"
                  :disabled="info.accessRequireList.length <=1"
                ></el-button>
              </el-form-item>
            </div>
          </div>
        </div>

        <div class="addfin-rongzi">
          <h1>二维码</h1>
          <div class="financing-item">
            <el-form-item label="二维码维度">
              <el-select
                v-model="info.prdChannelDTO.qrDimension"
                placeholder="请选择"
                :disabled="isView"
                clearable
              >
                <el-option
                  v-for="item in prdChannelDTOOptin"
                  :key="item.dictParam"
                  :label="item.displayName"
                  :value="item.dictParam"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="financing-item-req">
            <div
              class="qrcode-item-line"
              v-for="(item, index) in info.prdChannelDTO.qrChannelList"
              :key="item.id"
            >
              <el-form-item
                label="承兑人名称"
                :prop="'prdChannelDTO.qrChannelList.' + index + '.key'"
                :rules="infoFromRules.key"
              >
                <el-input v-model="item.key" placeholder="请输入" :disabled="isView" />
              </el-form-item>
              <el-form-item
                label="二维码链接"
                :prop="'prdChannelDTO.qrChannelList.' + index + '.linkUrl'"
                :rules="infoFromRules.linkUrl"
                class="prdChannel"
              >
                <el-input v-model="item.linkUrl" placeholder="请输入" :disabled="isView" />
              </el-form-item>
              <el-form-item
                label="二维码图片"
                class="qrcode-img"
                :prop="'prdChannelDTO.qrChannelList.' + index + '.uploadData'"
                :rules="infoFromRules.uploadData"
              >
                <el-input v-model="item.uploadData" class="uploadInput"></el-input>
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :class="{hide: isHide(item)}"
                  :file-list="item.file_list"
                  :http-request="(event) => {uploadFile(event ,item)}"
                  :on-change="(file) => { handleChange(file, item) }"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}" style="height: 100%">
                    <el-image class="el-upload-list__item-thumbnail" :src="file.url">
                      <div slot="placeholder" class="image-slot">
                        <i class="el-icon-loading"></i>
                      </div>
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file, item)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span class="el-upload-list__item-delete" @click="fileRemove(item)">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item class="btns">
                <el-button
                  class="reduction add"
                  icon="el-icon-plus"
                  @click="addfinBox()"
                  type="text"
                ></el-button>
                <el-button
                  class="reduction"
                  icon="el-icon-minus"
                  @click="delFinBox(item.id)"
                  type="text"
                  :disabled="info.prdChannelDTO.qrChannelList.length <=1"
                ></el-button>
              </el-form-item>
            </div>
          </div>
          <el-dialog
            :visible.sync="dialogVisible"
            center
            width="40%"
          >
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </el-form>
    </section>

    <section class="fix-footer my-flex">
      <el-button @click="cancel" type="hollow">取消</el-button>
      <el-button class="mlright" @click="save" :loading="submitLoading" :disabled="isView">保存</el-button>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    detailList: {
      type: Object,
      default: () => ({})
    }
  },
  name: 'financing',
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      Checkdisabled: false,
      checkbox: false,
      prdCode: '',
      prdChannelDTOOptin: [
        { dictParam : "BANK_BRANCH", displayName: "分行维度", dictKey: "BANK_BRANCH" },
        { dictParam : "BANK_BRANCH2", displayName: "分行维度2", dictKey: "BANK_BRANCH2" },
        { dictParam : "BANK_BRANCH3", displayName: "分行维度3", dictKey: "BANK_BRANCH3" }
      ],
      info: {},
      infoFromRules: {
        key: [{ required: true, message: '请输入渠道代码', trigger: 'blur' }],
        linkUrl: [
          { required: true, message: '请输入二维码链接', trigger: 'blur' }
        ],
        uploadData: [
          { required: true, message: '请点击上传图片', trigger: 'change' }
        ],
        'prdChannelDTO.qrDimension': [
          { required: true, message: '请选择二维码维度', trigger: 'change' }
        ],
        financingLimit: [
          { required: true, message: '请输入融资限额', trigger: 'blur' }
        ],
        financingPeriod: [
          { required: true, message: '请输入融资期限', trigger: 'blur' }
        ]
      },
      submitLoading: false,
      logoShowName: '',
      type: ''
    }
  },
  watch: {
    detailList: {
      handler(newVal, oldVal) {
        this.info = newVal
        console.log(this.info, oldVal, 'financing ---> watch ---> this.info')
      },
      immediate: true
    },
    'info.financingLimit': {
      handler(n, v) {
        if (n) {
          this.Checkdisabled = true
        } else {
          this.Checkdisabled = false
        }
      },
      immediate: true
    }
  },
  computed: {
    isView() {
      if (this.type === 'view') {
        return true
      }
      return false
    },
    isHide() {
      return function(item) {
        return item.file_list && item.file_list.length >= 1
      }
    }
  },
  methods: {
    addfin() {
      this.info.accessRequireList.push({
        id:
          String(Date.now()).slice(9) +
          Math.floor(Math.random() * (100 - 0)) +
          0,
        accessRequire: ''
      })
      console.log(this.info.accessRequireList, 'this.info.accessRequireList')
    },
    delFin(id) {
      const delIndex = this.info.accessRequireList.findIndex(
        element => element.id === id
      )
      this.info.accessRequireList.splice(delIndex, 1)
    },
    // 点击+号添加
    addfinBox() {
      this.info.prdChannelDTO.qrChannelList.push({
        id:
          String(Date.now()).slice(9) +
          Math.floor(Math.random() * (100 - 0)) +
          0,
        key: '',
        linkUrl: '',
        qrCodeFileId: '',
        file_list: [],
        dialogImageUrl: '',
        dialogVisible: false,
        uploadData: {}
      })
    },
    delFinBox(id) {
      const delIndex = this.info.prdChannelDTO.qrChannelList.findIndex(
        element => element.id === id
      )
      this.info.prdChannelDTO.qrChannelList.splice(delIndex, 1)
    },
    cancel() {
      // this.info = {}
      this.$router.go(-1)
    },
    clearFile(val) {
      if (!val) {
        this.logoShowName = ''
      }
    },
    handleChange(file, item) {
      item.file_list = [
        {
          name: file.name,
          url: file.url
        }
      ]
    },
    fileRemove(item) {
      item.file_list = []
      item.qrCodeFileId = ''
      item.dialogImageUrl = ''
      item.uploadData = ''
      // this.$forceUpdate()
    },
    handlePictureCardPreview(file, item) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      // this.$forceUpdate()
    },
    // 点击上传图片
    uploadFile({ file }, item) {
      item.uploadData = file.uid
      return
      if (!file || !file.type) return
      if (this.oldFile !== file) {
        this.oldFile = file
      } else {
        return
      }
      if (!/^(image\/png|image\/jpg|image\/jpeg)$/.test(file.type)) {
        this.$llsAlert({
          type: 'error',
          text: '请上传jp(e)g/png图片'
        })
        this.$set(this.info, 'qrCodeFileIdUrl', '')
        return
      }
      if (/\s+/g.test(file.name)) {
        this.$llsAlert({
          type: 'error',
          text: '图片文件不能带空格'
        })
        this.$set(this.info, 'qrCodeFileIdUrl', '')
        return
      }
      if (file.size > 1024 * 1024) {
        this.$llsAlert({
          type: 'error',
          text: '请上传小于1M的文件'
        })
        this.$set(this.info, 'qrCodeFileIdUrl', '')
        return
      }

      const params = new FormData()
      params.append('file', file)
      tpService
        .fileUpload(
          {
            group: 'logo'
          },
          params
        )
        .then(res => {
          console.log('文件上传返回数据', res)
          // this.$set(this.info, 'qrCodeFileIdUrl', `/tp-web/file/previewDirect/${res.id}`)
          this.$set(
            this.info.prdChannelDTO.qrChannelList[index],
            'qrCodeFileId',
            res.id
          )
          // this.previewUrl()
        })
        .catch(e => {
          this.$llsAlert({
            type: 'info',
            text: '上传图片出错，请稍后重试',
            title: '信息提示'
          })
          this.$set(this.info, 'qrCodeFileIdUrl', '')
          this.$forceUpdate()
        })
    },
    // 保存
    save() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const accessRequire = JSON.stringify(
            this.info.accessRequireList.map(item => item.accessRequire)
          )
          // 处理二维码信息
          const prdChannelDTO = Object.assign({}, this.info.prdChannelDTO)
          prdChannelDTO.qrChannelList = prdChannelDTO.qrChannelList.map(
            item => {
              return {
                key: item.key,
                qrCodeFileId: item.qrCodeFileId,
                linkUrl: item.linkUrl
              }
            }
          )
          const params = {
            financingLimit: Number(this.info.financingLimit),
            financingPeriod: Number(this.info.financingPeriod),
            lendRequire: this.info.lendRequire,
            // 准入要求
            accessRequire,
            prdChannelDTO, // 二维码信息
            prdCode: this.$route.query.prdCode
          }
          debugger
          this.$emit('update', params)
          // this.saveFinanc()
        } else {
          this.$message({ type: 'warn', text: '请把信息填写完整' })
        }
      })
    },
    changeCheckbox(val) {
      this.info.hasFinancingLimit = val.length > 0 ? 'Y' : 'N'
      console.log(val, this.info.hasFinancingLimit, 'changeCheckbox')
    }
  },
  mounted() {
    console.log('financing ---> mounted')
  }
}
</script>

<style lang="scss" scoped>
.financing {
  width: 100%;
  height: calc(100vh);
  .myFlex {
    display: flex;
    flex-direction: column;
    .lls-form {
      display: flex;
      flex-direction: column;
    }
    .financing-item {
      display: flex;
      .lls-form-item {
        width: 430px;
      }
    }
    .financing-item-req {
      display: flex;
      flex-direction: column;
      .financing-icon {
        display: flex;
      }
      .lls-form-item {
        width: 430px;
      }
      .lls-addnum {
        cursor: pointer;
      }
    }
  }
  ::v-deep.lls-form-note {
    left: 110px;
  }
  .cb-group-box {
    margin-top: -36px;
  }
  .qrCodeTop {
    width: 100%;
  }
  .addFin {
    display: flex;
  }
  .qrCode-item {
    display: flex;

    .add {
      padding-left: 10px;
    }
  }
  .reduction {
    color: #00a9ff;
    font-size: 26px;
    padding-left: 20px;
  }
  .cb-group-box {
    padding-left: 20px;
  }
  ::v-deep .lls-form-item {
    width: 400px !important;
    height: auto !important;
    margin-bottom: 20px;
  }
  ::v-deep.lls-collapse-box {
    width: 100%;
  }
  ::v-deep.lls-coll-body {
    display: flex;
    flex-wrap: wrap;
  }
  .lls-input-main {
    width: 160px;
  }
  ::v-deep.lls-btn-text {
    border: none !important;
  }
  .lls-btn-disabled {
    color: #bbb !important;
    background: none;
    border: none;
  }
  .prdChannel {
    ::v-deep .el-form-item__label {
      padding-top: 6px !important;
    }
  }
}
::v-deep .hide .el-upload--picture-card {
  display: none;
}
::v-deep .el-upload-list__item {
  transition: none !important;
}
::v-deep .qrcode-item-line {
  height: 365px;
}
::v-deep .btns .el-form-item__content {
  margin-left: 0 !important;
}
::v-deep .qrcode-img .el-form-item__content {
  height: 154px;
}
::v-deep .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 66px;
}
::v-deep .uploadInput {
  display: none;
}
</style>
