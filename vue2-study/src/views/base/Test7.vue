<template>
  <div>
    <BaseCheckbox
      v-model="checkValue"
     />
  </div>
</template>

<script>
import BaseCheckbox from '../../components/BaseCheckbox.vue'

export default {
  components: {
    BaseCheckbox
  },
  data() {
    return {
      checkValue: false
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
