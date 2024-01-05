<template>
  <div>
    <div :style="{ fontSize: '26px', fontWeight: 'bold' }">这里是父组件</div>
    <button @click="list.pop()">改变list内容</button>
    <MyChild :list="list" @sort="sort" />
  </div>
</template>

<script>
import MyChild from './Test161.vue'

export default {
  components: {
    MyChild
  },
  data() {
    return {
      list: []
    }
  },
  beforeCreate() {
    console.log('父组件 --- beforeCreate')
  },
  created() {
    console.log('父组件 --- created')
  },
  beforeMount() {
    console.log('父组件 --- beforeMount')
  },
  mounted() {
    setTimeout(() => {
      this.list = [
        { name: '张三', age: 18 },
        { name: '李四', age: 28 },
        { name: '王五', age: 13 }
      ]
    }, 5000)
    console.log('父组件 --- mounted')
  },
  beforeUpdate() {
    console.log('父组件 --- beforeUpdate')
  },
  updated() {
    console.log('父组件 --- updated')
  },
  methods: {
    sort(val) {
      val.forEach(item => {
        this.list.push({
          name: item,
          age: 18
        })
      })
    }
  }
}
</script>

<style>

</style>
