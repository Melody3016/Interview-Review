<template>
   <input type="text"
    :value="value"
    @input="inputHanlder"
   >
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    inputHanlder(e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style>

</style>
