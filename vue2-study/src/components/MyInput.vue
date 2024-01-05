<template>
  <input
    type="text"
    v-model="inputValue"
  />
</template>

<script>
export default {
  data() {
    return {
      msg: 123,
      inputValue: ''
    }
  },
  beforeCreate() {
    console.log('MyInput ===>> ', 'beforeCreate')
  },
  created() {
    console.log('MyInput ===>> ', 'created')
  },
  beforeMount() {
    console.log('MyInput ===>> ', 'beforeMount')
  },
  mounted() {
    console.log('MyInput ===>> ', 'mounted')
  },
  beforeUpdate() {
    console.log('MyInput ===>> ', 'beforeUpdate')
  },
  updated() {
    console.log('MyInput ===>> ', 'updated')
  },
  beforeDestroy() {
    console.log('MyInput ===>> ', 'beforeDestroy')
  },
  destroyed() {
    console.log('MyInput ===>> ', 'destroyed')
  },
  activated() {
    console.log('MyInput ===>> ', 'activated')
  },
  deactivated() {
    console.log('MyInput ===>> ', 'deactivated')
  },
  methods: {
    sayHi() {
    }
  }
}
</script>

<style>

</style>
