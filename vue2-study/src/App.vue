<template>
  <div id="app">
    <el-container>
      <el-header height="">
        <h1 class="title">Vue Study</h1>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-menu
            :default-openeds="submenuIndex"
            :unique-opened="true"
            :default-active="activeIndex"
            :router="true"
            background-color="#545c64"
            text-color="#fff"
          >
            <el-submenu index="1">
              <template slot="title">基础部分</template>
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item
                v-for="item in baseNavInfo"
                :key="item.name"
                :index="item.path">
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">路由相关</template>
              <el-menu-item
                v-for="item in routerNavInfo"
                :key="item.name"
                :index="item.path">
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">项目相关</template>
              <el-menu-item
                v-for="item in projectNavInfo"
                :key="item.name"
                :index="item.path">
                {{ item.title }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      activeIndex: '/',
      submenuIndex: ['1']
    }
  },
  computed: {
    ...mapGetters(['baseNavInfo', 'routerNavInfo', 'projectNavInfo']),
    ...mapState(['routesInfo'])
  },
  watch: {
    $route(newVal) {
      this.activeIndex = newVal.path
    }
  },
  /* mounted() {
    console.log(this.$route)
    this.activeIndex = window.location.href.split('#')[1]
  },
  updated() {
    // console.log(this.$route)
  } */
  created() {
    console.log('App created', this.$route)
    console.log('App created', this.$route.path)
  },
  mounted() {
    console.log('App mounted', this.$route)
    console.log('App mounted', this.$route.path)
    this.initRoute()
  },
  methods: {
    initRoute() {
      // 动态添加路由
      this.routesInfo.forEach(item => {
        // 封装路由信息对象
        this.addRouteInfo(item)
      })
      // 添加404路由
      this.$router.addRoute({
        path: '*',
        name: 'NotFound',
        component: () => import('@/components/NotFound.vue')
      })
    },
    addRouteInfo(item) {
      this.packingRouteInfo(item)
      if (item.children) {
        item.children.forEach(ele => {
          this.packingRouteInfo(ele, item.name)
          // 判断是否有children
          if (ele.children) {
            ele.children.forEach(e => {
              this.addRouteInfo(e)
            })
          }
        })
      }
    },
    packingRouteInfo(data, parentName) {
      const obj = {
        path: data.path,
        name: data.name,
        component: () => import(`@/views/${data.componentUrl}`)
        // component: resolve => require([`@/${data.componentUrl}`], resolve)
      }
      if (data.mate) {
        obj.meta = data.meta
      }
      if (data.props) {
        obj.props = data.props
      }
      parentName ? this.$router.addRoute(parentName, obj) : this.$router.addRoute(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./assets/css/reset.css');

#app {
  height: 100%;
  .title {
    margin: 15px 20px;
  }
}

.el-container, .el-menu{
  height: 100%;
}
.el-container {
  overflow: hidden;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
}
.el-aside {
  height: 100%;
  min-width: 220px;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 100%;
  overflow: auto;
}
</style>
