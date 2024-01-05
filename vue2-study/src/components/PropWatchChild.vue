<template>
  <div>
    <h2>子组件</h2>
    <h3>姓名：{{ info.name }} </h3>
    <h3>年级：{{ grade }}</h3>
    <ul>
      <li
        v-for="item in subjectsList"
        :key="item.id"
      >
        {{ item.id }}  ---- {{ item.subName }} --- {{ item.score }}
        <input type="text" v-model="item.subName" />
      </li>
    </ul>
    <button @click="handleClick">直接改变info</button>
  </div>
</template>

<script>
// import { deepClone } from '@/util/func.js'

export default {
  props: {
    detailData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    handleClick() {
      this.info = '{}'
    }
  },
  computed: {
    grade() {
      return this.info.school && this.info.school.grade
    },
    subjectsList() {
      return this.info.school && this.info.school.subjectsList
    }
  },
  watch: {
    detailData: {
      handler(newVal, oldVal) {
        this.info = newVal
        console.log(newVal, oldVal, 'watch ---> detailData')
      }
    }
  },
  mounted() {
    console.log('PropWatchChild ---> mounted')
  },
  updated() {
    console.log('PropWatchChild ---> updated')
  }
}
</script>

<style>
</style>
