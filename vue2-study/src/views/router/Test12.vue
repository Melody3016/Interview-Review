<template>
  <div>
    <div id="nav">
      <router-link to="/test12/test121">子路由1</router-link> |
      <router-link to="/test12/test122">子路由2</router-link> |
      <router-link to="/test12/test123">子路由3</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
}
</script>

<style lang="less" scoped>
#nav {
  top: 50px;
}
</style>
