<template>
  <div>
    <my-input />
  </div>
</template>

<script>
import MyInput from '../../components/MyInput.vue'

export default {
  components: {
    MyInput
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style>

</style>
