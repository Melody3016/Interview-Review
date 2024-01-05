<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <transition name="fade1" mode="out-in">
            <p v-if="isShow == '0'" class="card" :style="{ background: 'red' }">用户管理</p>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <transition name="fade2" mode="out-in">
            <p v-if="isShow == '1'" class="card" :style="{ background: 'pink' }">配置管理</p>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <transition name="fade3" mode="out-in">
            <p v-if="isShow == '2'" class="card" :style="{ background: 'blue' }">角色管理</p>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">
          <transition name="fade4" mode="out-in">
            <p v-if="isShow == '3'" class="card" :style="{ background: 'green' }">定时任务补偿</p>
          </transition>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      isShow: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      this.isShow = tab.index
    }
  }
}
</script>

<style scoped>
  .container {
    width: 500px;
    margin: 0 auto;
  }
  .card {
    height: 100px;
    line-height: 100px;
    color: white;
    font-size: 25px;
  }
  .fade1-enter-active, .fade1-leave-active,
  .fade2-enter-active, .fade2-leave-active,
  .fade3-enter-active, .fade3-leave-active,
  .fade4-enter-active, .fade4-leave-active {
    transition: all .5s;
  }
  .fade1-enter {
    transform: translateX(-100%);
  }
  .fade1-leave-to {
    transform: translateX(-100%);
  }
  .fade2-enter, .fade2-leave-to {
    transform: translateX(-100%);
  }
  .fade3-enter, .fade3-leave-to {
    transform: translateX(100%);
  }
  .fade4-enter, .fade4-leave-to {
    transform: translateX(100%);
  }
</style>
