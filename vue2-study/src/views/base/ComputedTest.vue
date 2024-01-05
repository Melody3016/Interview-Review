<template>
  <div>
    <el-input type="text" v-model="text"></el-input>
    <p v-for="item in msg" :key="item.name">{{ item.name }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '123',
      list: [
        { name: 'zs', value: '11111111111111' },
        { name: 'lisi', value: '2222222222222222' },
        { name: 'wangwu', value: '33333333333333333' }
      ]
    }
  },
  computed: {
    msg() {
      console.log(this.text)
      return this.list.filter(item => item.name.includes(this.text))
    }
  }
}
</script>

<style></style>
