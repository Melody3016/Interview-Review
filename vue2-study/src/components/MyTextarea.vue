<template>
  <textarea
    cols="30"
    rows="10"
    v-model="value"
  ></textarea>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  beforeCreate() {
    console.log('MyTextarea ===>> ', 'beforeCreate')
  },
  created() {
    console.log('MyTextarea ===>> ', 'created')
  },
  beforeMount() {
    console.log('MyTextarea ===>> ', 'beforeMount')
  },
  mounted() {
    console.log('MyTextarea ===>> ', 'mounted')
  },
  beforeUpdate() {
    console.log('MyTextarea ===>> ', 'beforeUpdate')
  },
  updated() {
    console.log('MyTextarea ===>> ', 'updated')
  },
  beforeDestroy() {
    console.log('MyTextarea ===>> ', 'beforeDestroy')
  },
  destroyed() {
    console.log('MyTextarea ===>> ', 'destroyed')
  },
  activated() {
    console.log('MyTextarea ===>> ', 'activated')
  },
  deactivated() {
    console.log('MyTextarea ===>> ', 'deactivated')
  }
}
</script>

<style>

</style>
