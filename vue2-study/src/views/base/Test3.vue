<template>
  <div class="about">
    <h1>切换组件</h1>
    <div id="nav">
      <a
        :class="{ actived: activeIndex === 0 }"
        @click="clickHandler(0, 'nameInput')"
      >姓名输入框</a> |
      <a
        :class="{ actived: activeIndex === 1 }"
        @click="clickHandler(1, 'ageInput')"
      >年龄输入框</a>
    </div>
    <keep-alive>
      <component :is="componentName"></component>
    </keep-alive>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput.vue'
import MyTextarea from '@/components/MyTextarea.vue'

export default {
  components: {
    nameInput: MyInput,
    ageInput: MyTextarea
  },
  data() {
    return {
      activeIndex: 0,
      componentName: 'nameInput'
    }
  },
  methods: {
    clickHandler(index, componentName) {
      this.activeIndex = index
      this.componentName = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  top: 50px;
  a {
    cursor: pointer;
    &.actived {
      color: #42b983;
    }
  }
}
</style>
