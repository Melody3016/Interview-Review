<template>
  <WatchChild :detailData="detailData"></WatchChild>
</template>

<script>
import WatchChild from '@/components/WatchChild.vue'
export default {
  components: {
    WatchChild
  },
  data() {
    return {
      detailData: {}
    }
  },
  mounted() {
    setTimeout(() => {
      this.detailData = {
        name: '监听测试',
        data: {
          tag: '列表信息',
          list: [
            { id: 1, value: '111' },
            { id: 2, value: '222' },
            { id: 3, value: '333' }
          ]
        }
      }
    }, 1000)
  }
}
</script>

<style>

</style>
