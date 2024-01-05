<template>
  <div>
    <h1>父组件：{{msgObj.msg}}</h1>
    <button @click="handleClick">改变msg</button>
    <PropWatchChild :detailData="detailData" />
  </div>
</template>

<script>
import PropWatchChild from '@/components/PropWatchChild.vue'

export default {
  components: {
    PropWatchChild
  },
  data() {
    return {
      msgObj: { msg: 'hello PropWatch!' },
      detailData: {}
    }
  },
  methods: {
    handleClick() {
      // this.detailData.name = '李四'
      this.detailData = {
        name: '李四'
      }
    },
    getDetailData() {
      setTimeout(() => {
        this.detailData = {
          name: '张三',
          school: {
            grade: '初二',
            subjectsList: [
              { id: 1, subName: '语文', score: 80 },
              { id: 2, subName: '数学', score: 80 },
              { id: 3, subName: '英语', score: 80 }
            ]
          }
        }
      }, 1000)
    }
  },
  mounted() {
    console.log('PropWatch ---> mounted')
    this.getDetailData()
  },
  updated() {
    console.log('PropWatch ---> updated')
  }
}
</script>

<style>
</style>
