<template>
  <div class="container">
    <nav>
      <span @click="handleClick(0)" :class="{ active: index === 0 }">用户管理</span>
      <span @click="handleClick(1)" :class="{ active: index === 1 }">配置管理</span>
      <span @click="handleClick(2)" :class="{ active: index === 2 }">角色管理</span>
      <span @click="handleClick(3)" :class="{ active: index === 3 }">定时任务补偿</span>
    </nav>
    <transition name="fade" mode="out-in">
      <p
        v-if="index === 0"
        :style="{ background: 'red' }"
        :key="0"
        class="card"
      >用户管理</p>
      <p
        v-if="index === 1"
        :style="{ background: 'pink' }"
        :key="1"
        class="card"
      >配置管理</p>
      <p
        v-if="index === 2"
        :style="{ background: 'blue' }"
        :key="2"
        class="card"
      >角色管理</p>
      <p
        v-if="index === 3"
        :style="{ background: 'green' }"
        :key="3"
        class="card"
      >定时任务补偿</p>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      index: 2
    }
  },
  methods: {
    handleClick(index) {
      this.index = index
    }
  }
}
</script>

<style scoped>
  .container {
    width: 500px;
    margin: 0 auto;
    position: relative;
  }
  nav span {
    display: inline-block;
    width: 100px;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
  }
  .card {
    height: 100px;
    line-height: 100px;
    color: white;
    font-size: 25px;
    position: absolute;
    width: 500px;
  }
  .active {
    color: #42b983;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter {
    transform: translateX(-100%);
  }
  .fade-leave-to {
    transform: translateX(100%);
  }
</style>
