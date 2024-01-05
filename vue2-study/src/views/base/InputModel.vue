<template>
  <div>
    <input type="text" :value="text" @input="$event => text = $event.target.value">
  </div>
</template>

<script>

export default {
  data() {
    return {
      text: "123",
      visible: false
    }
  },
  watch: {
    text(n) {
      console.log(n)
    }
  },
  methods: {
    handleInput() {
      console.log('input')
    }
  }
}
</script>

<style></style>
