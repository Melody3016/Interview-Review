<template>
  <div id="box">
    <el-card class="box-card">
      <el-row v-for="(item, iIndex) in allAttr" :key="iIndex">
        <h3 style="margin-bottom: 20px;">{{ item.name }}：</h3>
        <el-row>
          <div
            plain
            class="btn"
            v-for="(ele, vIndex) in showBtn(item.name)"
            :key="vIndex"
            :class="{ highlight: ele.status === 1, disabled: ele.status === 2 }"
            @click="handlerClick(ele, iIndex)"
          >
            {{ ele.value }}
          </div>
        </el-row>
        <el-divider></el-divider>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 按钮信息
const btnInfos = []
// 数据
const allAttr = [
  {
    name: '颜色',
    values: ['白色', '黑色', '红色', '橙色', '蓝色', '紫色']
  },
  {
    name: '规格',
    values: ['大1匹', '1.5匹', '2匹', '2.5匹', '3匹', '3.5匹']
  },
  {
    name: '型号',
    values: ['N8MXC1', 'N8MXC2', 'wdnmd', 'kkmdkhg', 'weeg', 'htrh']
  }
]
const skuMap = {
  111: {
    elemList: [
      { name: '颜色', value: '白色' },
      { name: '规格', value: '大1匹' },
      { name: '型号', value: 'N8MXC2' }
    ]
  },
  222: {
    elemList: [
      { name: '颜色', value: '白色' },
      { name: '规格', value: '1.5匹' },
      { name: '型号', value: 'wdnmd' }
    ]
  },
  333: {
    elemList: [
      { name: '颜色', value: '黑色' },
      { name: '规格', value: '大1匹' },
      { name: '型号', value: 'N8MXC2' }
    ]
  },
  444: {
    elemList: [
      { name: '颜色', value: '黑色' },
      { name: '规格', value: '大1匹' },
      { name: '型号', value: 'wdnmd' }
    ]
  }
}
export default {
  data() {
    return {
      // 选中的数据
      activeValues: new Map(),
      allAttr,
      skuMap,
      btnInfos
    }
  },
  computed: {
    showBtn() {
      return function(name) {
        return this.btnInfos.filter(item => item.name === name)
      }
    }
  },
  methods: {
    // 转换数据
    convertData() {
      this.btnInfos = []
      this.allAttr.forEach((item, index) => {
        item.values.forEach(value => {
          this.btnInfos.push({
            name: item.name,
            value,
            status: 0, // 0--未选中， 1--已选中， 2--禁用,
            category: index // 所属分类
          })
        })
      })
    },
    handlerClick(item, index) {
      const allLen = this.allAttr.length
      // 禁用状态无法点击
      if (item.status === 2) return
      // 对选中数据和状态进行操作
      if (item.status === 0) {
        this.activeValues.set(index, item.value)
        // 同类别有其他按钮为选中状态需设为未选中
        this.btnInfos.forEach(ele => {
          if (ele.category === index && ele.status === 1) ele.status = 0
        })
        item.status = 1
      } else {
        this.activeValues.delete(index)
        item.status = 0
      }

      // 没有任何选中时进行状态重置
      if (this.activeValues.size === 0) {
        this.btnInfos.forEach(ele => (ele.status = 0))
        console.log('选中数据：', this.activeValues)
        return
      }
      // 全部选中判断是否合法
      if (this.activeValues.size === allLen) {
        const isFind = this.isExist(this.activeValues)
        if (!isFind) {
          // 不合法则进行删除
          this.activeValues.delete(this.activeValues.size - 1)
        }
      }
      console.log('选中数据：', this.activeValues)
      // 根据已选中按钮更新所有选中状态
      this.changeStatus(index)
    },
    changeStatus(index) {
      // 更新每个按钮的状态
      this.btnInfos.forEach(item => {
        // 同分类不进行判断
        if (item.category === index) return
        // 遍历skuMap，判断当前按钮value和已选中按钮value的组合是否存在
        const target = new Map()
        this.activeValues.forEach((value, key) => {
          target.set(key, value)
        })
        // 添加当前item按钮
        target.set(item.category, item.value)
        // 更改按钮状态
        const isFind = this.isExist(target)
        if (isFind) {
          item.status = item.status === 2 ? 0 : item.status
        } else {
          item.status = 2
        }
      })
    },
    // 判断选中组合是否存在
    isExist(selectedMap) {
      const selectedArr = Array.from(selectedMap.values())
      let isFind = false
      // eslint-disable-next-line no-unused-vars
      for (const key in this.skuMap) {
        if (Object.hasOwnProperty.call(this.skuMap, key)) {
          const elemList = this.skuMap[key].elemList
          // elemList的value不包含selectedArr，则代表需禁用
          const tempArr = selectedArr.filter(item =>
            elemList.find(ele => ele.value === item)
          )
          if (tempArr.length === selectedArr.length) {
            isFind = true
            break
          }
        }
      }
      return isFind
    }
  },
  mounted() {
    this.convertData()
  }
}
</script>

<style lang="scss" scoped>
#box {
  width: 800px;
  margin: 100px auto;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

#box .highlight {
  border-color: red;
  background-color: red;
  color: #fff;
}

.btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 10px;
}

#box .btn:hover {
  color: red;
  border-color: red;
  background: #fff;
}

.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.disabled:hover {
  color: #c0c4cc !important;
  background-color: #fff !important;
  border-color: #ebeef5 !important;
}
</style>
