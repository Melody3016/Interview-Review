<template>
  <div class="basicInfor">
    <h1>basicInfor</h1>
    <!-- <section class="itemInfo">
      <llsForm2 :model="info" :rules="rules" ref="ruleForm">
        <llsCollapse title="基本信息">
          <llsFormItem label="资方名称" prop="lendOrg">
            <llsInput v-model="info.lendOrg" placeholder="请输入" :disabled="isEdit" />
          </llsFormItem>
          <llsFormItem label="业务类型" prop="businessType">
            <llsSelect v-model="info.businessType" placeholder="请输入" :disabled="isEdit">
              <llsOption
                v-for="item in businessTypeOption"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
          <llsFormItem label="产品名称" prop="prdName">
            <llsInput v-model="info.prdName" placeholder="请输入" />
          </llsFormItem>
          <llsFormItem label="担保机构">
            <llsInput v-model="info.guaranteeOrg" placeholder="请输入" :disabled="isView" />
          </llsFormItem>
          <llsFormItem label="产品编码" prop="prdCode">
            <llsInput v-model="info.prdCode" placeholder="请输入" :disabled="isEdit" />
          </llsFormItem>
          <llsFormItem label="生效状态" prop="enable">
            <llsSelect v-model="info.enable" placeholder="请输入" :disabled="isView">
              <llsOption
                v-for="item in enableOption"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
        </llsCollapse>

        <llsCollapse title="产品性质">
          <llsFormItem label="入驻形式" prop="settleType">
            <llsSelect v-model="info.settleType" placeholder="请输入" :disabled="isEdit">
              <llsOption
                v-for="item in settleTypeOptin"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
          <llsFormItem label="资方额度 ">
            <llsInput v-model="info.lendLimit" placeholder="请输入" :disabled="isView" />
          </llsFormItem>
          <llsFormItem label="额度到期日">
            <llsDatePicker v-model="info.limitPeriod" type="form" :disabled="isView"></llsDatePicker>
          </llsFormItem>
          <llsFormItem label="付息方式" v-show="isCredit">
            <llsSelect v-model="info.payInterestType" placeholder="请输入" :disabled="isView">
              <llsOption
                v-for="item in payInterestTypeOption"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
          <llsFormItem label="清算方式" v-show="isCredit">
            <llsSelect v-model="info.payoffType" placeholder="请输入" :disabled="isView">
              <llsOption
                v-for="item in payoffTypeOption"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
          <llsFormItem label="贴现种类" v-show="isCredit">
            <llsSelect v-model="info.discountType" placeholder="请输入" :disabled="isView">
              <llsOption
                v-for="item in discountTypeOption"
                :key="item.dictParam"
                :label="item.displayName"
                :value="item.dictParam"
              ></llsOption>
            </llsSelect>
          </llsFormItem>
        </llsCollapse>

        <llsCollapse title="归属信息">
          <llsFormItem label="产品负责人" prop="manager">
            <llsInput v-model="info.manager" placeholder="请输入" :disabled="isView" />
          </llsFormItem>
          <llsFormItem label="产品归属部门 " prop="department">
            <llsInput v-model="info.department" placeholder="请输入" :disabled="isView" />
          </llsFormItem>
        </llsCollapse>
      </llsForm2>
    </section>
    <section class="fix-footer my-flex">
      <llsButton @click="cancel" type="hollow">取消</llsButton>
      <llsButton class="mlright" @click="save" :loading="submitLoading" :disabled="isView">保存</llsButton>
    </section> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'basicInfor',
  props: {
    detailList: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      info: {}
    }
  },
  watch: {
    detailList: {
      handler(newVal, oldVal) {
        this.info = newVal
        console.log(this.info, oldVal, 'basicInfor ---> watch ---> this.info')
      }
    }
  },
  computed: {
  },
  methods: {
    cancel() {
      this.info = {}
      this.$router.go(-1)
    },
    // 保存
    save() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const params = {
            id: this.id,
            lendOrg: this.info.lendOrg,
            businessType: this.info.businessType,
            prdCode: this.info.prdCode,
            settleType: this.info.settleType,
            discountType: this.info.discountType,
            payInterestType: this.info.payInterestType,
            prdName: this.info.prdName,
            guaranteeOrg: this.info.guaranteeOrg,
            enable: this.info.enable,
            lendLimit: this.info.lendLimit,
            limitPeriod: this.info.limitPeriod,
            payoffType: this.info.payoffType,
            manager: this.info.manager,
            department: this.info.department
          }
          console.log(params, 'params')
          this.$emit('update', params)
        } else {
          this.$llsMessage({ type: 'warn', text: '请把信息填写完整' })
        }
      })
    }
  },
  mounted() {
    console.log('basicInfor ---> mounted')
  }
}
</script>

<style lang="scss" scoped>
.basicInfor {
  width: 100%;
  height: calc(100vh);

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
}
</style>
