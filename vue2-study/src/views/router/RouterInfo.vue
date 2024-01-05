<template>
  <div class="box">路由懒加载信息获取测试</div>
</template>

<script>
export default {
  created() {
    console.log('RouterInfo', this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
  .box {
    text-align: center;
    font-size: 26px;
  }
</style>>
