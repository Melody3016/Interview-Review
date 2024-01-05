<template>
  <div class="container">
    <div class="all-check">
      <el-checkbox
        v-model="checkAll"
        :indeterminate="checkAllInd"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
    </div>
    <el-collapse class="collapse">
      <el-collapse-item v-for="item in list" :key="item.id">
        <template slot="title" class="title">
          <el-checkbox
            v-model="item.selected"
            :disabled="item.fixed"
            :indeterminate="isFirstInd"
            @change="handleFirstCheckAllChange($event, item)"
            >{{ item.elementName }}</el-checkbox
          >
        </template>
        <!-- 内容使用组件，组件中进行递归渲染 -->
        <collapse-content :data="item.subElementList"></collapse-content>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import CollapseContent from '@/components/CollapseContent.vue'
import res from '@/util/checkboxData.json'

export default {
  components: {
    CollapseContent
  },
  data() {
    return {
      list: [],
      checkAll: false,
      checkAllInd: false
    }
  },
  computed: {
    /**
     * @param {object} item 当前数据对象item
     * @returns {boolean} 是否为不确定状态
     */
    isFirstInd(item) {
      return false
    }
  },
  methods: {
    /**
     * @param {boolean} val 是否全选
     */
    handleCheckAllChange(val) {
      // 进行全选全部不选操作
      this.handleSelect(this.list, val)
      // 手动选择时，不确定状态永远为false
      this.checkAllInd = false
    },

    handleSelect(list, val) {
      list.forEach(item => {
        // 禁用状态下不进行操作
        if (!item.fixed) {
          item.selected = val
        }
        if (item.subElementList.length) {
          this.handleSelect(item.subElementList, val)
        }
        if (item.childElementList.length) {
          this.handleSelect(item.childElementList, val)
        }
      })
    },

    /**
     * @param {boolean} val 是否全选
     * @param {object} item 当前数据对象item
     */
    handleFirstCheckAllChange(val, item) {
      console.log(val, item)
    }
  },
  mounted() {
    setTimeout(() => {
      this.list = res.data
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
.container {
  .all-check {
    text-align: right;
    margin-bottom: 20px;

    .el-checkbox {
      ::v-deep .el-checkbox__input {
        transform: scale(1.4);
      }
      ::v-deep .el-checkbox__label {
        font-size: 22px;
        font-weight: bolder;
      }
    }
  }

  .collapse {
    .el-collapse-item {
      margin-bottom: 15px;

      ::v-deep .el-collapse-item__header {
        padding: 0 10px;

        .el-checkbox__input {
          transform: scale(1.2);
        }
        .el-checkbox__label {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
