<template>
  <div>
    <BaseInput
      :value.sync="inputValue"
     />
  </div>
</template>

<script>
import BaseInput from '../../components/BaseInput3.vue'

export default {
  components: {
    BaseInput
  },
  data() {
    return {
      inputValue: ''
    }
  }
}
</script>

<style>

</style>
