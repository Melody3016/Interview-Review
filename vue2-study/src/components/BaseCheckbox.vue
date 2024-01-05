<template>
    <label>
      单选
      <input type="checkbox"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      />
    </label>
</template>

<script>
export default {
  // 定义组件v-model的值和事件名
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
