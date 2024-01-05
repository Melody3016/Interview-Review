import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }/* ,
  {
    path: '/routerInfo',
    name: 'RouterInfo',
    component: RouterInfo
  } */
]

/* const routes2 = [
  {
    path: '/',
    name: 'Test1',
    component: Test1
  },
  {
    path: '/test2/',
    name: 'Test2',
    component: Test2,
    props: route => (route.query)
  },
  {
    path: '/test3',
    name: 'Test3',
    component: () => import('../views/Test3.vue')
  },
  {
    path: '/test4',
    name: 'Test4',
    component: () => import('../views/Test4.vue')
  },
  {
    path: '/test5',
    name: 'Test5',
    component: () => import('../views/Test5.vue')
  },
  {
    path: '/test6',
    name: 'Test6',
    component: () => import('../views/Test6.vue')
  },
  {
    path: '/test7',
    name: 'Test7',
    component: () => import('../views/Test7.vue')
  },
  {
    path: '/test8',
    name: 'Test8',
    component: () => import('../views/Test8.vue')
  },
  {
    path: '/test9',
    name: 'Test9',
    component: () => import('../views/Test9.vue'),
    meta: { msg: '我是test9路由信息' },
    children: [
      {
        path: 'test91',
        name: 'Test91',
        component: () => import('../views/Test91.vue'),
        meta: { msg: '我是test9下的test91路由信息' }
      },
      {
        path: 'test92',
        name: 'Test92',
        component: () => import('../views/Test92.vue')
      },
      {
        path: 'test93',
        name: 'Test93',
        component: () => import('../views/Test93.vue')
      }
    ]
  },
  {
    path: '/test10',
    name: 'Test10',
    component: () => import('../views/Test10.vue')
  },
  {
    path: '/test11',
    name: 'Test11',
    component: () => import('../views/Test11.vue')
  },
  {
    path: '/test12',
    name: 'Test12',
    component: () => import('../views/Test12.vue'),
    children: [
      {
        path: 'test121',
        name: 'Test121',
        component: () => import('../views/Test121.vue')
      },
      {
        path: 'test122',
        name: 'Test122',
        component: () => import('../views/Test122.vue')
      },
      {
        path: 'test123',
        name: 'Test123',
        component: () => import('../views/Test123.vue')
      }
    ]
  },
  {
    path: '/test13',
    name: 'Test13',
    component: () => import('../views/Test13.vue')
  },
  {
    path: '/test14',
    name: 'Test14',
    component: () => import('../views/Test14.vue')
  },
  {
    path: '/test15',
    name: 'Test15',
    component: () => import('../views/Test15.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue')
  }
] */

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savaPosition) {
    if (savaPosition) {
      return savaPosition
    } else {
      return { x: 0, y: 0, behavior: 'smooth' }
    }
  }
})

export default router
