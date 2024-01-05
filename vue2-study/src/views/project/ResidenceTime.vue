<template>
  <div style="font-size: 26px; font-weight: bold;">This is ResidenceTime.vue! </div>
</template>

<script>
export default {
  data() {
    return {
      enterTime: '',
      stayTime: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被验证前调用
    next(vm => {
      // 记录进入该路由的时间戳
      vm.enterTime = Date.now()
    })
  },
  beforeRouteLeave(to, from, next) {
    // 在导航离开渲染该组件的对应路由时调用
    // 记录停留时间
    this.stayTime = Date.now() - this.enterTime
    console.log(`页面停留时间为：${this.stayTime}ms`)
    next()
  }
}
</script>

<style>

</style>
