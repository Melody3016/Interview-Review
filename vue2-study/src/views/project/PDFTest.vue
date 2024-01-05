<template>
  <div>
    <button @click="handlerClick">加载PDF</button>
    <iframe
      v-if="showPdf"
      id='previewPdf'
      :src="'/static/pdf/web/viewer.html?file=' + fileUrl"
      height="560"
      width="100%">
    </iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPdf: false,
      fileUrl: '/static/temp.pdf'
    }
  },
  methods: {
    handlerClick() {
      this.showPdf = !this.showPdf
      // window.open('/static/pdf/web/viewer.html?file=' + encodeURIComponent(this.fileUrl))
    }
  }
}
</script>

<style>

</style>
