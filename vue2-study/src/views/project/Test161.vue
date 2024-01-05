<template>
  <div>
    <div :style="{ fontSize: '20px' }">这里是子组件</div>
    <br>
    <br>
    <br>
    <div>{{ tableData }}</div>
    <br>
    <br>
    <br>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        姓名： {{ item.name }} --- 年龄： {{ item.age }}
      </li>
    </ul>
    <div>子组件内的消息： {{ msg }}</div>
    <button @click="msg = 222">改变消息</button>
    <select v-model="caseList" multiple>
      <option :value="0">请选择</option>
      <option :value="1">呜呜呜呜</option>
      <option :value="2">啊啊啊啊</option>
      <option :value="3">额鹅鹅鹅</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      msg: 111,
      caseList: []
    }
  },
  computed: {
    tableData() {
      if (this.list[0]) {
        return this.list[0].name
      } else {
        return null
      }
    }
  },
  watch: {
    // list: {
    //   handler(newVal) {
    //     this.tableData = newVal[0]
    //   },
    //   deep: true
    // },
    caseList(newVal) {
      console.log(newVal)
      this.$emit('sort', newVal)
    }
  },
  beforeCreate() {
    console.log('子组件 --- beforeCreate')
  },
  created() {
    console.log('子组件 --- created')
  },
  beforeMount() {
    console.log('子组件 --- beforeMount')
  },
  mounted() {
    console.log('子组件 --- mounted')
  },
  beforeUpdate() {
    console.log('子组件 --- beforeUpdate')
  },
  updated() {
    console.log('子组件 --- updated')
  }
}
</script>

<style>

</style>
