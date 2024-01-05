<template>
  <div class="createMembers">
    <div class="title">用户设置</div>
    <el-form
      class="edit"
      ref="ruleForm"
      label-width="80px"
      :rules="rules"
      :model="ruleForm"
    >
      <el-form-item label="用户名" prop="customerName">
        <el-input
          v-model="ruleForm.customerName"
          style="width: 186px"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input
          v-model="ruleForm.passWord"
          style="width: 186px"
          placeholder="请输入"
          :type="pwdType"
        >
          <i slot="suffix" :class="eyeType" @click="changeType()"></i
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="surePassWord"
        v-if="state !== 'editor'"
      >
        <el-input
          v-model="ruleForm.surePassWord"
          style="width: 186px"
          placeholder="请输入"
          :type="pwdType2"
        >
          <i slot="suffix" :class="eyeType2" @click="changeType2()"></i
        ></el-input>
      </el-form-item>

      <div class="addPermissions">
        <span>权限设置</span>
        <div @click="addRole"><span>+</span>添加</div>
      </div>

      <el-table style="width: 100%" :data="ruleForm.itemFrom" height="400">
        <el-table-column width="300">
          <template slot="header">
            <span class="title">所属业务</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="business"
              :prop="`itemFrom[${$index}].productName`"
              :rules="{
                required: true,
                message: '请选择业务',
                trigger: 'change'
              }"
            >
              <el-select
                v-model="row.productName"
                placeholder="请选择"
                multiple
                collapse-tags
              >
                <el-option
                  v-for="item in businessList"
                  :key="item.productId"
                  :label="item.productName"
                  :value="item.productId"
                  :disabled="isDisabled(item.productId, row.productName)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column width="300">
          <template slot="header">
            <span class="title">角色</span>
          </template>
          <template #default="{ row, $index }">
            <el-form-item
              class="business"
              :prop="`itemFrom[${$index}].roleName`"
              :rules="{
                required: true,
                message: '请选择角色',
                trigger: 'change'
              }"
            >
              <el-select
                class="add-input"
                v-model="row.roleName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in roleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template #default="{ row }">
            <el-form-item class="business">
              <el-button
                type="text"
                @click="delePortMapping(row)"
                :disabled="ruleForm.itemFrom && ruleForm.itemFrom.length <= 1"
              >
                删除
              </el-button>
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-button @click="submitFrom">提交表单</el-button>
    <el-button @click="recoveryFrom">回显数据</el-button>
  </div>
</template>

<script>
// import { products } from "@/api/apiTableList";
export default {
  name: 'createMembers',
  props: {
    state: {
      type: String,
      default: 'add'
    },
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.surePassWord !== '') {
          this.$refs.ruleForm.validateField('surePassWord')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value !== this.ruleForm.passWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // const itemFromValidate = (rule, value, callback) => {
    //   console.log(value)
    //   if (value.productName.length === 0) {
    //     callback(new Error('请选择业务'))
    //   } else if (value.roleName === '') {
    //     callback(new Error('请选择角色'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      dialogVisible: false,
      ruleForm: {
        customerName: '', // 客户名称
        passWord: '', // 密码
        surePassWord: '', // 确认密码
        itemFrom: [
          {
            productName: [],
            roleName: ''
          }
        ]
      },
      roleList: [
        // 角色集合
        {
          value: 'manager',
          label: '管理员'
        },
        {
          value: 'maintainer',
          label: '维护者'
        },
        {
          value: 'developer',
          label: '开发者'
        },
        {
          value: 'visitor',
          label: '访客'
        }
      ],
      rules: {
        customerName: [{ required: true, message: '请输入用户名' }],
        passWord: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        surePassWord: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      eyeType: 'el-icon-view',
      eyeType2: 'el-icon-view',
      pwdType: 'password',
      pwdType2: 'password',
      businessList: [] // 所属业务集合
    }
  },
  methods: {
    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
      this.eyeType = this.eyeType === 'el-icon-view' ? 'el-icon-view' : ''
    },
    changeType2() {
      this.pwdType2 = this.pwdType2 === 'password' ? 'text' : 'password'
      this.eyeType2 = this.eyeType2 === 'el-icon-view' ? 'el-icon-view' : ''
    },
    // 获取所属业务列表
    getList() {
      // const that = this
      // products(that.listQuery)
      //   .then((res) => {
      //     this.businessList = res.data.list.items
      //   })
      //   .catch(() => {})
      this.businessList = [
        {
          username: 'ceshi',
          productId: 'caizi',
          roleName: 'manager',
          productName: '财资管理',
          timestamp: '2021-11-23 10:42:07'
        },
        {
          username: 'd',
          productId: 'zhongdeng',
          roleName: 'visitor',
          productName: '智能中登',
          timestamp: '2021-11-23 10:41:24'
        },
        {
          username: 'inin',
          productId: 'zhushou',
          roleName: 'developer',
          productName: '蜜蜂助手',
          timestamp: '2021-11-23 09:39:23'
        }
      ]
    },

    // 点击添加
    addRole() {
      this.ruleForm.itemFrom.push({
        productName: [],
        roleName: ''
      })
    },

    // 点击删除
    delePortMapping(row) {
      this.ruleForm.itemFrom.forEach((item, index) => {
        if (item === row) {
          this.ruleForm.itemFrom.splice(index, 1)
        }
      })
    },

    // 校验表单
    async validation() {
      try {
        return this.$refs.ruleForm.validate()
      } catch (error) {
        return false
      }
    },

    // 提交表单
    submitFrom() {
      this.$refs.ruleForm.validate((boolean, object) => {
        console.log(boolean, object)
        console.log(this.ruleForm)
      })
    },

    // 回显方法
    recoveryFrom() {
      const newVal = {
        username: 'uuuu',
        password: '111',
        items: [
          {
            productId: ['caizi'],
            productName: ['caizi'],
            roleName: 'manager'
          },
          {
            productId: ['zhongdeng', 'caizi', 'zhushou'],
            productName: ['zhongdeng', 'caizi', 'zhushou'],
            roleName: 'maintainer'
          }
        ]
      }
      this.ruleForm.passWord = newVal.password
      this.ruleForm.customerName = newVal.username
      this.ruleForm.itemFrom = []
      newVal.items.forEach(el => {
        this.ruleForm.itemFrom.push(el)
      })
    }
  },
  created() {
    this.getList()
  },
  watch: {
    itemData(newVal) {
      newVal = {
        username: 'uuuu',
        password: '111',
        items: [
          {
            productId: 'caizi',
            productName: '财资管理',
            roleName: 'manager'
          },
          {
            productId: ['zhongdeng', 'caizi', 'zhushou'],
            productName: '智能中登',
            roleName: 'maintainer'
          }
        ]
      }
      this.ruleForm.passWord = newVal.password
      this.ruleForm.customerName = newVal.username
      this.ruleForm.itemFrom = []
      newVal.items.forEach(el => {
        this.ruleForm.itemFrom.push(el)
      })
    }
  },
  computed: {
    isDisabled() {
      return (id, value) => {
        console.log(id, value)
        let flag = false
        this.ruleForm.itemFrom.forEach(item => {
          if (item.productName.find(ele => ele === id)) {
            flag = true
          }
        })
        if (value.find(ele => ele === id)) flag = false
        return flag
      }
    }
  }
}
</script>

<style scoped lang="scss">
.createMembers {
  .title {
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 14px;
  }
  .addPermissions {
    display: flex;
    justify-content: space-between;
    line-height: 32px;
    div {
      color: #0887ff;
      cursor: pointer;
    }
  }
  .business {
    ::v-deep.el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
