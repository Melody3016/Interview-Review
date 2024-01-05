<template>
   <input type="text"
    v-model="inputValue"
    @keyup.enter="enterHandler"
   />
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    enterHandler() {
      this.$emit('my-input', this.inputValue)
      this.inputValue = ''
    }
  }
}
</script>

<style>

</style>
