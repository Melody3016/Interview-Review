<template>
  <div>
    <p v-for="(item, index) in list" :key="index">
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: new Array(100).fill('test122')
    }
  }
}
</script>

<style>

</style>
