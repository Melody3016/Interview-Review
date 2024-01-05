<template>
  <div class="container">
    <el-card class="box-card">
      <template #header>第三方库拖拽排序</template>
      <div class="content">
        <draggable
          class="list-group"
          tag="div"
          v-model="list"
          v-bind="dragOptions"
          handle=".drag"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <transition-group>
            <div
              class="item"
              v-for="(item) in list"
              :key="item.id"
            >
              <i class="el-icon-info"></i>
              <span>{{ item.id }} --- {{ item.value }}</span>
              <div class="drag">
                <i class="el-icon-rank"></i>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable/src/vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
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
      ]
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 500,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  methods: {
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
