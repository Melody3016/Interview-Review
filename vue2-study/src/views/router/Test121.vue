<template>
  <div>
    <a href="#123">锚点测试</a>
    <p v-for="(item, index) in list" :key="index">
      {{ item }}
    </p>
    <p id="123">跳转到锚点</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: new Array(100).fill('test121')
    }
  }
}
</script>

<style>

</style>
