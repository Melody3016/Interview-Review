<template>
  <div>
    <BaseInput
      @my-input="handlerEvent"
     />
  </div>
</template>

<script>
import BaseInput from '../../components/BaseInput2.vue'

export default {
  components: {
    BaseInput
  },
  methods: {
    handlerEvent(val) {
      console.log(val)
    }
  }
}
</script>

<style>

</style>
