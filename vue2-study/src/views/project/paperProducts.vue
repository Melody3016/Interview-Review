<template>
  <div class="paperProducts">
    <!-- <lls-tabs :tabArr="tabArr" :hasBack="true" :title="isPaper" :initIndex="0" @clickTab="clickTab">
      <keep-alive>
        <template v-if="tabIndex == 0">
          <basicInfor :detailList="detailList" @update="update" ref="basicInforEle" />
        </template>
        <template v-if="tabIndex == 1">
          <financing :detailList="detailList" @update="update" />
        </template>
        <template v-if="tabIndex == 2">
          <trial :detailList="detailList" @update="update" />
        </template>
        <template v-if="tabIndex == 3">
          <accessInfors :detailList="detailList" @update="update" />
        </template>
      </keep-alive>
    </lls-tabs> -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <basicInfor v-if="activeName === 'first'" :detailList="detailList" @update="update" ref="basicInforEle" />
        <financing v-if="activeName === 'second'" :detailList="detailList" @update="update" />
      </el-tab-pane>
      <el-tab-pane label="融资要素" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/* eslint-disable */
import basicInfor from '@/components/basicInfor'
import financing from '@/components/financing'
import res from '@/util/data.json'

export default {
  name: 'paperProducts',
  components: {
    basicInfor,
    financing
  },
  data() {
    return {
      activeName: 'first',
      dataId: 0,
      loading: '',
      detailList: {}
    }
  },
  computed: {},
  methods: {
    // 获取票据详情
    getPrdBillConfig() {
      this.loading = this.$loading({ target: this.$refs.basicInforEle.$el })
      setTimeout(() => {
        this.detailList = this.convertData(res.data)
        this.loading.close()
      }, 800)
      // tpService
      //   .prdBillConfig({ prdCode: this.prdCode })
      //   .then(res => {
      //     this.detailList = this.convertData(res)
      //   })
      //   .catch(e => {
      //     this.loading.close()
      //     throw e
      //   })
    },
    // 处理数据
    convertData(data) {
      const detailData = data
      detailData.businessType = JSON.parse(detailData.businessType).dictParam
      detailData.enable = JSON.parse(detailData.enable).dictParam
      detailData.settleType = JSON.parse(detailData.settleType).dictParam
      detailData.payInterestType = JSON.parse(
        detailData.payInterestType
      ).dictParam
      detailData.payoffType = JSON.parse(detailData.payoffType).dictParam
      detailData.discountType = JSON.parse(detailData.discountType).dictParam
      detailData.duedateExtendType = JSON.parse(
        detailData.duedateExtendType
      ).dictParam
      detailData.lendAmountExtendType = JSON.parse(
        detailData.lendAmountExtendType
      ).dictParam
      detailData.tryCalculationType = JSON.parse(
        detailData.tryCalculationType
      ).dictParam
      detailData.guaranteeAmountExtendType = JSON.parse(
        detailData.guaranteeAmountExtendType
      ).dictParam
      detailData.loanAmountExtendType = JSON.parse(
        detailData.loanAmountExtendType
      ).dictParam
      if (!detailData.accessRequire) {
        detailData.accessRequireList = [
          {
            id: '' + Date.now() + Math.floor(Math.random() * (10 - 0)) + 0,
            accessRequire: ''
          }
        ]
      } else {
        detailData.accessRequireList = JSON.parse(
          detailData.accessRequire
        ).map(item => ({ id: this.dataId++, accessRequire: item }))
      }
      if (!detailData.prdChannelDTO) {
        detailData.prdChannelDTO = {
          qrDimension: '',
          qrChannelList: [
            {
              key: '',
              linkUrl: '',
              qrCodeFileId: '',
              file_list: [],
              dialogImageUrl: '',
              dialogVisible: false,
              uploadData: {}
            }
          ]
        }
      } else {
        detailData.prdChannelDTO.qrDimension =
          detailData.prdChannelDTO?.qrDimension &&
          JSON.parse(detailData?.prdChannelDTO?.qrDimension).dictParam
        detailData.prdChannelDTO.qrChannelList = detailData.prdChannelDTO?.qrChannelList.map(
          item =>
            Object.assign(item, {
              id: this.dataId++,
              file_list: [],
              uploadData: {}
            })
        )
      }
      this.getQRCodeImgUrl(detailData)
      debugger
      return detailData
    },
    // 获取二维码图片地址
    getQRCodeImgUrl(data) {
      data.prdChannelDTO.qrChannelList.forEach(element => {
        const res = 'https://wx3.sinaimg.cn/mw2000/001tamZBgy1h82s3pa7gxj61900u0n3l02.jpg'
        const id = element.qrCodeFileId
        if (!id) return
        setTimeout(() => {
          debugger
          element = Object.assign(element, {
            file_list: [{ name: id, url: res }],
            uploadData: res
          })
        }, 5000)
      })
    },
    //票据更新
    update(data) {
      const params = { ...data, id: this.detailList.id }
      tpService.updatePrdBillConfig(params).then(res => {
        this.$llsMessage({ type: 'success', text: '更新成功' })
        this.$router.go(-1)
      })
    }
  },
  mounted() {
    // this.prdCode = this.$route.query.prdCode
    this.getPrdBillConfig()
  }
}
</script>

<style lang="scss" scoped>
.paperProducts {
  height: 100%;
}
::v-deep #pane-first {
  display: block !important;
}
</style>