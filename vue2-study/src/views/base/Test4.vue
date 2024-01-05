<template>
  <div>
    <input type="text"
      v-model.lazy="inputData"
    >
    <p>{{ inputData }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: ''
    }
  }
}
</script>

<style>

</style>
