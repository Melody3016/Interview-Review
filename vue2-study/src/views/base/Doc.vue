<template>
  <div>
    <h1 ref="box">This is Doc</h1>
    <h2>Message: {{ msg }}</h2>
    <ComponentA :childMsg="msg" />
  </div>
</template>

<script>
var ComponentA = {
  // template: `<div>childMsg: {{ childMsg }} </div>`,
  render: function(createElement) {
    return createElement('div', `childMsg: ${this.opt}`)
  },
  props: ['childMsg'],
  data() {
    return {
      opt: 'opt'
    }
  },
  mounted() {
    console.log("ComponentA---mounted")
  },
  updated() {
    console.log("ComponentA---updated")
  }
}
export default {
  data() {
    return {
      msg: 'hello',
      list: [
        { name: 'zs', age: 18 },
        { name: 'ls', age: 20 }
      ]
    }
  },
  components: {
    ComponentA
  },
  methods: {
    handlerClick() {
      console.log('handlerClick')
    }
  },
  beforeCreate() {
    console.log('beforeCreate', this.msg, this.handlerClick, this.$refs.box) // undefined undefined undefined
  },
  created() {
    console.log('created', this.msg, this.handlerClick, this.$refs.box) // 1 1 undefined
  },
  beforeMount() {
    console.log('beforeMount', this.msg, this.handlerClick, this.$refs.box) // 1 1 undefined
  },
  // mounted() {
  //   console.log('mounted', this.msg, this.handlerClick, this.$refs.box) // 1 1 1
  // },
  mounted: [
    function() {
      console.log('mounted', this.msg, this.handlerClick, this.$refs.box) // 1 1 1
    },
    function() {
      setTimeout(() => {
        this.msg = '123'
      }, 1000)
    }
  ],

  beforeUpdate() {
    console.log('beforeUpdate', this.msg, this.handlerClick, this.$refs.box) // 1 1 1
  },
  updated() {
    console.log('updated', this.msg, this.handlerClick, this.$refs.box) // 1 1 1
  },

  beforeDestroy() {
    console.log('beforeDestroy', this.msg, this.handlerClick, this.$refs.box) // 1 1 1
  },
  destroyed() {
    console.log('destroyed', this.msg, this.handlerClick, this.$refs.box) // 1 1 undefined
  }
}
</script>

<style></style>
