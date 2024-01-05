<template>
  <div class="about" style="">
    <ul class="infinite-list">
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
      isLoading: true,
      isReady: false
    }
  },
  methods: {
    initList(nums) {
      setTimeout(() => {
        for (let index = 1; index <= nums; index++) {
          this.list.push({
            name: '你好' + index
          })
        }
        this.box = this.list.slice(0, 25)
        this.isReady = true
      }, 2000)
    },
    loadMore() {
      // 全部加载完毕，不再显示loading
      if (this.box.length === this.list.length) {
        this.isLoading = false
      }
      setTimeout(() => {
        this.num += 10
        this.box = this.list.slice(0, this.num)
      }, 500)
    }
  },
  mounted() {
    this.initList(100)
    // this.box = this.list.slice(0, 5)
    // 观察loading元素是否出现在视口
    const obj = new IntersectionObserver((entires) => {
      const entry = entires[0]
      if (entry.isIntersecting && this.isReady) {
        this.loadMore()
      }
    }, {
      threshold: 0.1
    })
    obj.observe(this.$refs.loading)
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
