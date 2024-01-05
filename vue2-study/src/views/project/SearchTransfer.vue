<template>
  <div class="container">
    <el-card class="box-card">
      <el-select class="search" v-model="depValue" clearable placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in depOptions"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-transfer
        v-model="transferValue"
        :data="transferData"
        @change="changeHandler"
      >
      </el-transfer>
    </el-card>
  </div>
</template>

<script>
import Mock from 'mockjs'

export default {
  data() {
    return {
      input: '',
      depValue: '',
      depOptions: [
        { id: 1, name: '人事部' },
        { id: 2, name: '行政部' },
        { id: 3, name: '技术部' },
        { id: 4, name: 'IT部' },
        { id: 5, name: '金融部' }
      ],
      allData: [],
      transferValue: [],
      transferData: [],
      transferValueData: []
    }
  },
  methods: {
    // 获取所有用户数据
    queryAllRoleData() {
      var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|20': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          name: '@cname',
          dep: '@integer(1,5)'
        }]
      })
      console.log(data)
      this.allData = data.list.map(item => ({ key: item.id, label: item.name, dep: item.dep }))
      this.transferData = this.allData
    },
    queryRoleData() {
    },
    // 进行筛选
    selectChange(depId) {
      // 筛选时，将transferValueData合并到展示数据transferData中
      if (depId) {
        this.transferData = this.allData.filter(item => (item.dep === depId || this.transferValue.includes(item.key)))
        // // 进行合并操作
        // this.transferValueData.forEach(item => {
        //   if (!this.transferData.find(ele => ele.key === item.key)) {
        //     this.transferData.push(item)
        //   }
        // })
        // // 排序
        // this.transferData.sort(item => item.key)
      } else {
        this.transferData = this.allData
      }
    },
    // 筛选过滤
    filterMethod(query, item) {
      // query = this.depValue
      // if (query) {
      //   return item.dep === parseInt(query)
      // } else {
      //   return true
      // }
      // return this.depValue ? item.dep === this.depValue : true
      // return item.label.indexOf(query) > -1
    },
    changeHandler(selectValues) {
      // 数据移动改变时，匹配当选中数据的详细用户数据保存到transferValueData中
      // this.transferValueData = this.transferData.filter(item => selectValues.includes(item.key))
    }
  },
  mounted() {
    this.queryAllRoleData()
    // this.queryRoleData()
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  min-width: 500px;
  text-align: left;
  .search {
    margin: 20px 0 100px;
  }
}
</style>
