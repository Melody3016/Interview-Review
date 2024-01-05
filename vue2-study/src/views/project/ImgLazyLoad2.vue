<template>
  <div class="about" style="">
    <ul class="infinite-list">
      <li v-for="(i,index) in list" :key="index">
        <img style="height: 100%; width: 100%" v-lazy="i.imgUrl" />
      </li>
    </ul>
  </div>
</template>

<script>

export default ({
  data() {
    return {
      list: [],
      isLoading: true,
      isReady: false
    }
  },
  methods: {
    initList(nums) {
      setTimeout(() => {
        for (let index = 1; index <= nums; index++) {
          this.list.push({
            imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2008-6-13%2F200806131108306030.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664615377&t=d945294b0d01b4ea7085a5531485e10b'
          })
        }
      }, 100)
    }
  },
  mounted() {
    this.initList(100)
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
