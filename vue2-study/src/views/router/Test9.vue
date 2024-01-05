<template>
  <div>
    <div id="nav">
      <router-link to="/test9/test91">子路由1</router-link> |
      <router-link to="/test9/test92">子路由2</router-link> |
      <router-link to="/test9/test93">子路由3</router-link>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
#nav {
  top: 50px;
}
</style>
