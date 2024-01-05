<template>
  <div class="container">
    <el-card class="box-card">
      <template #header>H5拖拽排序</template>
      <el-switch v-model="obj.isOpen"></el-switch>
      <div class="content">
        <transition-group>
          <div
            class="item"
            v-for="(item, index) in list" :key="item.id"
            @dragstart="dragstartHandler($event, index)"
            @dragenter="dragenterHandler($event, index)"
            @dragover="dragoverHandler($event)"
            @drop="dropHandler(index)"
          >
            <i class="el-icon-info"></i>
            <span>{{ item.id }} --- {{ item.value }}</span>
            <div class="drag"
              draggable="true"
            >
              <i class="el-icon-rank"></i>
            </div>
          </div>
        </transition-group>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        isOpen: true
      },
      list: [
        { id: 1, value: '用户管理' },
        { id: 2, value: '菜单管理' },
        { id: 3, value: '产品管理' },
        { id: 4, value: '路由管理' },
        { id: 5, value: '商品管理' }
      ],
      backList: [
        { id: 1, value: '用户管理' },
        { id: 2, value: '菜单管理' },
        { id: 3, value: '产品管理' },
        { id: 4, value: '路由管理' },
        { id: 5, value: '商品管理' }
      ],
      startIndex: -1,
      timeId: -1
    }
  },
  methods: {
    dragstartHandler(e, index) {
      // console.log(e)
      // 将父元素设置为draggable
      // e.target.parentNode.setAttribute('draggable', true)
      // 设置拖拽元素开始的索引
      this.startIndex = index
    },
    // dragenter和dragover事件的默认行为是拒绝接受任何被拖放的元素。
    // 因此，我们要在这两个拖放事件中使用preventDefault来阻止浏览器的默认行为
    dragenterHandler(e, index) {
      // console.log('enter', index)
      // this.endIndex = index
      e.preventDefault()
    /*       let dragEndIndex = index
      // 被拖拽目标和拖拽目标为同一元素，不进行操作
      if (this.dragStartIndex === index) return
      if (this.timeId !== -1) {
        // 防抖
        clearTimeout(this.timeId)
      }
      this.timeId = setTimeout(() => {
        // 先本地排序，再发送请求
        if (dragEndIndex < this.dragStartIndex) {
          [dragEndIndex, this.dragStartIndex] = [this.dragStartIndex, dragEndIndex]
        }
        const target = this.list.splice(dragEndIndex, 1)[0]
        // console.log(this.list[0].value, this.list[1].value)
        // console.log(this.list, 'this.list')
        this.list.splice(this.dragStartIndex, 0, target)
        // console.log(this.list[0].value, this.list[1].value)
        // 排序变化后目标对象的索引变成源对象的索引
        // this.dragStartIndex = index
        this.isSort = true
      }, 200) */
    },
    dragoverHandler(e) {
      e.preventDefault()
    },
    dropHandler(index) {
      console.log('开始索引：', this.startIndex, '结束索引：', index)
      // 无需进行排序
      if (this.startIndex === index) return
      // 先本地排序，再发送请求
      if (index < this.startIndex) {
        [index, this.startIndex] = [this.startIndex, index]
      }
      const target = this.list.splice(index, 1)[0]
      // console.log(this.list[0].value, this.list[1].value)
      // console.log(this.list, 'this.list')
      this.list.splice(this.startIndex, 0, target)
      // console.log(this.list[0].value, this.list[1].value)
      // 排序变化后目标对象的索引变成源对象的索引
      // this.dragStartIndex = index
      if (this.timeId !== -1) {
        // 防抖
        clearTimeout(this.timeId)
      }
      this.timeId = setTimeout(() => {
        // const isSuccess = parseInt(Math.random() * 100) % 2
        const isSuccess = true
        if (isSuccess) {
          // 模拟成功
          console.log('发送请求', this.list.map(item => item.id))
          this.$message.success('排序成功！')
          this.backList = this.list.slice()
        } else {
          // 模拟失败
          this.$message.error('排序失败，请重新操作！')
          setTimeout(() => {
            this.list = this.backList.slice()
          }, 500)
        }
      }, 1500)
    /* if (!this.isSort) return
      if (this.timeId2 !== -1) {
        // 防抖
        clearTimeout(this.timeId2)
      }
      this.timeId2 = setTimeout(() => {
        console.log('发送请求', parseInt(Math.random() * 100))
        this.$message.success('排序成功！')
      }, 1000) */
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  min-width: 500px;
  text-align: left;
  .content {
    margin: 20px;
    .item {
      width: 150px;
      padding: 5px 15px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      background-color: #FFF;
      overflow: hidden;
      color: #303133;
      transition: .5s;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      user-select: none;

      .drag {
        cursor: pointer;
        font-size: 20px;

        &:hover {
          color: #5cb6ff;
        }
      }
    }
  }
}
</style>
