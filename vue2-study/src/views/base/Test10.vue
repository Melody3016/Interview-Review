<template>
  <div>
    <Children
      :getMsg="getMsg"
     />
     来自子组件的数据：{{ msg }}
    <div :style="{ height: '5000px' }"></div>
  </div>
</template>

<script>
import Children from '../../components/Children.vue'

export default {
  components: {
    Children
  },
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    getMsg(value) {
      this.msg = value
    }
  }
}
</script>

<style>

</style>
