<template>
  <div>
    <h1>{{ fun1() }}</h1>
    <h2>{{ fun2() }}</h2>
    <h3>{{ fun3() }}</h3>
    <h4>{{ fun4() }}</h4>
    <div v-if="isJiGe()">{{ student.name }} 的成绩合格</div>
    <div v-else>{{ student.name }} 的成绩不合格</div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  data() {
    return {
      student: {
        name: '小明',
        score: {
          yuwen: 80,
          shuxue: 60,
          yingyu: 50,
          zhengzhi: 90,
          lishi: 88,
          wuli: 50,
          huaxue: 60
        }
      },
      msg: 'hello',
      opt: 10,
      obj: {
        name: '张三',
        age: 18
      }
    }
  },
  methods: {
    isJiGe() {
      // 进一步优化
      for (const sub in this.student.score) {
        if (this.student.score[sub] < 60) {
          // 有一门不及格直接返回false
          return false
        }
      }
      return true
    },
    fun1() {
      return `${this.msg} world`
    },
    fun2() {
      return this.fun1().length
    },
    fun3() {
      return this.fun2() % 2 ? '奇数' : '偶数'
    },
    fun4() {
      const isOdd = this.fun2() % 2
      if (isOdd) {
        return this.opt > 5 ? this.obj.name : this.obj.age
      } else {
        return '奇数'
      }
    }
  }
}
</script>

<style></style>
