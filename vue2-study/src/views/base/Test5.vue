<template>
  <div>
    <BaseInput
      style="fontSize: 18px"
      class="red big"
      data-a="1"
      data-b="3"
     />
  </div>
</template>

<script>
import BaseInput from '../../components/BaseInput.vue'

export default {
  components: {
    BaseInput
  },
  data() {
    return {
      inputData: ''
    }
  }
}
</script>

<style>

</style>
