<template>
  <div class="container">
    <div class="content" v-for="(item, index) in list" :key="item.id">
      <div class="all-check">
        <el-checkbox v-model="item.selected" :disabled="item.fixed">{{
          item.elementName
        }}</el-checkbox>
      </div>
      <div class="check-group" v-if="item.childElementList.length">
        <el-checkbox-group v-model="item.checkList">
          <el-checkbox
            v-for="ele in item.childElementList"
            :key="ele.id"
            :label="ele.id"
            :disabled="ele.fixed"
            >{{ ele.elementName }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
      <!-- 递归调用自身组件 -->
      <div v-if="item.subElementList.length">
        <collapse-content :data="item.subElementList"></collapse-content>
      </div>
      <el-divider class="divider" v-if="(index < data.length - 1)"></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollapseContent",
  props: {
    data: {
      type: Array
    }
  },
  computed: {},
  data() {
    return {
      checkObj: {},
      list: []
    }
  },
  watch: {
    data: {
      handler(n) {
        this.list = n
        console.log('n', n)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    /**
     * @description 设置多选框组的选中状态
     */
    setCheckboxValue() {
      this.list.forEach(item => {
        if (item.childElementList.length) {
          const checkList = []
          item.childElementList.forEach(ele => {
            ele.selected && checkList.push(ele.id)
          })
          this.$set(item, 'checkList', checkList)
        }
      })
    }
  },
  created() {
    this.setCheckboxValue()
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: left;
  padding: 0 20px;

  .content {

    .all-check {
      margin-bottom: 5px;
      ::v-deep .el-checkbox__label {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .check-group {
      padding: 0 10px;
    }

    .divider {
      margin: 20px 0;
    }
  }
}
</style>
