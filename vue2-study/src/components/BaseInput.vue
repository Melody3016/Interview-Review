<template>
   <input type="text"
     v-bind="$attrs"
     :class="classObj"
     :style="styleObj"
   >
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      classObj: {
        actived: true,
        error: false
      },
      styleObj: {
        width: '200px',
        height: '60px'
      }
    }
  },
  mounted() {
    console.log(this.$attrs)
  }
}
</script>

<style>

</style>
