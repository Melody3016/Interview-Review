<template>
 <div>
  <input v-model="info.name" />
  <!-- <input v-model="info.data.tag" /> -->
  <!-- <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.id }} -- {{ item.value }}
    </li>
  </ul> -->
 </div>
</template>

<script>
export default {
  props: {
    detailData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      info: {
        name: ''
      }
    }
  },
  computed: {
    tag() {
      return this.info.data?.tag
    },
    list() {
      return this.info.data?.list
    }
  },
  watch: {
    detailData: {
      handler(newVal, oldVal) {
        // debugger
        this.info.name = newVal.name
        console.log('WatchChild --> watch --> this.info', this.info)
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
