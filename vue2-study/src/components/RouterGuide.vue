<template>

</template>

<script>
/*
    4.x版本
    不再传递第三个参数next，直接使用返回值进行路由跳转，return false则中止路由导航，没有返回值默认继续导航
    可以在路由守卫中使用inject函数，获取app.provide()注入的数据
    

    3.x版本
    路由导航守卫:
     1. 全局路由守卫
      - beforeEach(to, from, next)      全局前置守卫
      - beforeResolve(to, from, next)   全局解析守卫
      - afterEach(to, from)             全局后置守卫

     2. 单个路由守卫
      - beforeEnter(to, from, next)     路由独享守卫

     3. 组件内的路由守卫
      - beforeRouteEach(to, from, next)        进入守卫
      - beforeRouteUpdate(to, from, next)      更新守卫
      - beforeRouteLeave(to, from, next)       离开守卫


    完整的导航解析流程
    1. 导航被触发
    2. 如果从别的路由离开，则触发该路由组件中的beforeRouteLeave(to, from ,next)
    3. 触发全局前置守卫 beforeEach(to, from, next)
    4. 在重用的组件调用 beforeRouterUpdate(to, from, next)
    5. 触发路由配置中的守卫 beforeEnter(to, from, next)
    6. 解析异步组件
    7. 在被激活的组件调用 beforeRouterEnter(to, from, next)
    8. 触发全局解析守卫 beforeResolve(to, from, next)
    9. 导航被确认
    10. 触发全局后置守卫 afterEach(to, from)
    11. 触发dom渲染
    12. 调用beforeRouterEnter的回调函数next()，并将创建好的实例this作为参数传入
*/

export default {

}
</script>