<template>
  <div class="about" style="overflow:auto">
    <ul class="infinite-list" v-infinite-scroll="loadMore" infinite-scroll-distance="0" style="overflow:auto">
      <li v-for="(i,index) in box" :key="index">{{ i.name }}</li>
    </ul>
    <i v-if="isLoading" class="el-icon-loading" style="font-size: 26px" ref="loading"></i>
  </div>
</template>

<script>

export default ({
  data() {
    return {
      list: [],
      box: [],
      num: 25,
      isLoading: true
    }
  },
  methods: {
    initList(nums) {
      for (let index = 1; index <= nums; index++) {
        this.list.push({
          name: '你好' + index
        })
      }
    },
    loadMore() {
      // 全部加载完毕，不再显示loading
      /* if (this.box.length === this.list.length) {
        this.isLoading = false
      }
      setTimeout(() => {
        this.num += 10
        this.box = this.list.slice(0, this.num)
      }, 500) */
    }
  },
  mounted() {
    this.initList(100)
    this.box = this.list.slice(0, 25)
  }
})
</script>
<style lang="scss">
.infinite-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    border: 1px solid black;
    width: 300px;
    height: 140px;
    margin-bottom: 40px;
  }
}
</style>
