<template>
  <div>
    <input type="text" v-model="inputValue" />
    <button @click="clickHandler">将子组件数据传递到父组件</button>
  </div>
</template>

<script>
export default {
  props: ['getMsg'],
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    clickHandler() {
      // 直接调用父组件传递过来的方法
      this.getMsg(this.inputValue)
    }
  }
}
</script>

<style>
</style>
