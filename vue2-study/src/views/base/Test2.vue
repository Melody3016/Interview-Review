<template>
  <div class="about" style="height: 100%">
    <h1>{{ userId }}</h1>
  </div>
</template>

<script>

export default ({
  props: ['userId'],
  mounted() {
    console.log(this.$route)
  }
})
</script>
<style lang="scss">
</style>
