import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routesInfo: [
      {
        path: '/test1',
        name: 'Test1',
        title: '响应式测试',
        componentUrl: 'base/Test1.vue',
        status: 1
      },
      {
        path: '/test2',
        name: 'Test2',
        title: '冒泡测试',
        componentUrl: 'base/Test2.vue',
        props: route => (route.query),
        status: 1
      },
      {
        path: '/test3',
        name: 'Test3',
        title: '生命周期',
        componentUrl: 'base/Test3.vue',
        status: 1
      },
      {
        path: '/test4',
        name: 'Test4',
        title: 'lazy修饰符测试',
        componentUrl: 'base/Test4.vue',
        status: 1
      },
      {
        path: '/test5',
        name: 'Test5',
        title: '非prop的attribute测试',
        componentUrl: 'base/Test5.vue',
        status: 1
      },
      {
        path: '/test6',
        name: 'Test6',
        title: '自定义事件名测试',
        componentUrl: 'base/Test6.vue',
        status: 1
      },
      {
        path: '/test7',
        name: 'Test7',
        title: '组件使用v-model',
        componentUrl: 'base/Test7.vue',
        status: 1
      },
      {
        path: '/test8',
        name: 'Test8',
        title: '.sync修饰符测试',
        componentUrl: 'base/Test8.vue',
        status: 1
      },
      {
        path: '/test9',
        name: 'Test9',
        title: '路由缓存测试',
        componentUrl: 'router/Test9.vue',
        meta: {
          msg: '我是test9路由信息'
        },
        children: [
          {
            path: 'test91',
            name: 'Test91',
            title: '子路由1',
            componentUrl: 'router/Test91.vue',
            meta: {
              msg: '我是test9下的test91路由信息'
            }
          },
          {
            path: 'test92/:id',
            name: 'Test92',
            title: '子路由2',
            componentUrl: 'router/Test92.vue'
          },
          {
            path: 'test93',
            name: 'Test93',
            title: '子路由3',
            componentUrl: 'router/Test93.vue'
          }
        ],
        status: 2
      },
      {
        path: '/test10',
        name: 'Test10',
        title: '子传父测试',
        componentUrl: 'base/Test10.vue',
        status: 1
      },
      {
        path: '/test11',
        name: 'Test11',
        title: '编程式路由导航',
        componentUrl: 'router/Test11.vue',
        status: 2
      },
      {
        path: '/test12',
        name: 'Test12',
        title: '滚动行为测试',
        componentUrl: 'router/Test12.vue',
        children: [
          {
            path: 'test121',
            name: 'Test121',
            title: '子路由1',
            componentUrl: 'router/Test121.vue'
          },
          {
            path: 'test122',
            name: 'Test122',
            title: '子路由2',
            componentUrl: 'router/Test122.vue'
          },
          {
            path: 'test123',
            name: 'Test123',
            title: '子路由3',
            componentUrl: 'router/Test123.vue'
          }
        ],
        status: 2
      },
      {
        path: '/test13',
        name: 'Test13',
        title: '导航故障测试',
        componentUrl: 'router/Test13.vue',
        status: 2
      },
      {
        path: '/test14',
        name: 'Test14',
        title: 'tabs过渡测试',
        componentUrl: 'project/Test14.vue',
        status: 3
      },
      {
        path: '/test15',
        name: 'Test15',
        title: 'tabs过渡测试2',
        componentUrl: 'project/Test15.vue',
        status: 3
      },
      {
        path: '/test16',
        name: 'Test16',
        title: '子组件重新渲染问题',
        componentUrl: 'project/Test16.vue',
        status: 3
      },
      {
        path: '/pdf',
        name: 'PDFTest',
        title: '加载显示pdf文件',
        componentUrl: 'project/PDFTest.vue',
        status: 3
      },
      {
        path: '/select',
        name: 'SelectTest',
        title: '下拉选择框添加图标',
        componentUrl: 'project/SelectTest.vue',
        status: 3
      },
      {
        path: '/routerInfo',
        name: 'RouterInfo',
        title: '路由懒加载信息获取',
        componentUrl: 'router/RouterInfo.vue',
        status: 2
      },
      {
        path: '/fromValidator',
        name: 'FromValidator',
        title: 'element表格校验测试',
        componentUrl: 'project/FromValidator.vue',
        status: 3
      },
      {
        path: '/mulTable',
        name: 'MulTable',
        title: '可筛选表头表格1',
        componentUrl: 'project/MulTable.vue',
        status: 3
      },
      {
        path: '/mulTable2',
        name: 'MulTable2',
        title: '可筛选表头表格2',
        componentUrl: 'project/MulTable2.vue',
        status: 3
      },
      {
        path: '/uploadImg',
        name: 'UploadImg',
        title: '上传图片功能',
        componentUrl: 'project/UploadImg.vue',
        status: 3
      },
      {
        path: '/deviceCharts',
        name: 'DeviceCharts',
        title: '设备拓补图',
        componentUrl: 'project/DeviceCharts.vue',
        status: 3
      },
      {
        path: '/lineCharts',
        name: 'LineCharts',
        title: '折线图表',
        componentUrl: 'project/LineCharts.vue',
        status: 3
      },
      {
        path: '/infiniteScroll',
        name: 'InfiniteScroll',
        title: '无限滚动（原生）',
        componentUrl: 'project/InfiniteScroll.vue',
        status: 3
      },
      {
        path: '/infiniteScroll2',
        name: 'InfiniteScroll2',
        title: '无限滚动（指令）',
        componentUrl: 'project/InfiniteScroll2.vue',
        status: 3
      },
      {
        path: '/formVerify',
        name: 'FormVerify',
        title: '表单校验',
        componentUrl: 'project/FormVerify.vue',
        status: 3
      },
      {
        path: '/imgLazyLoad',
        name: 'ImgLazyLoad',
        title: '图片懒加载（原生）',
        componentUrl: 'project/ImgLazyLoad.vue',
        status: 3
      },
      {
        path: '/imgLazyLoad2',
        name: 'ImgLazyLoad2',
        title: '图片懒加载（插件）',
        componentUrl: 'project/ImgLazyLoad2.vue',
        status: 3
      },
      {
        path: '/dynamicVerify',
        name: 'DynamicVerify',
        title: '动态输入框校验',
        componentUrl: 'project/DynamicVerify.vue',
        status: 3
      },
      {
        path: '/uploadTest',
        name: 'UploadTest',
        title: '上传组件',
        componentUrl: 'project/UploadTest.vue',
        status: 3
      },
      {
        path: '/propWatch',
        name: 'PropWatch',
        title: '父传子监听和读取值',
        componentUrl: 'project/PropWatch.vue',
        status: 3
      },
      {
        path: '/paperProducts',
        name: 'paperProducts',
        title: '入驻产品编辑（项目）',
        componentUrl: 'project/paperProducts.vue',
        status: 3
      },
      {
        path: '/watchTest',
        name: 'WatchTest',
        title: 'watch测试',
        componentUrl: 'base/WatchTest.vue',
        status: 1
      },
      {
        path: '/residenceTime',
        name: 'ResidenceTime',
        title: '页面停留时间功能',
        componentUrl: 'project/ResidenceTime.vue',
        status: 3
      },
      {
        path: '/doc',
        name: 'Doc',
        title: 'vue文档问题',
        componentUrl: 'base/Doc.vue',
        status: 1
      },
      {
        path: '/productOptions',
        name: 'ProductOptions',
        title: '商品选项',
        componentUrl: 'project/ProductOptions.vue',
        status: 3
      },
      {
        path: '/downloadAndPreview',
        name: 'DownloadAndPreview',
        title: '文件下载和预览',
        componentUrl: 'project/DownloadAndPreview.vue',
        status: 3
      },
      {
        path: '/imageUpload',
        name: 'ImageUpload',
        title: '图片上传（彻底弄清）',
        componentUrl: 'project/ImageUpload.vue',
        status: 3
      },
      {
        path: '/searchTransfer',
        name: 'SearchTransfer',
        title: '条件筛选的穿梭框',
        componentUrl: 'project/SearchTransfer.vue',
        status: 3
      },
      {
        path: '/dragEvent',
        name: 'DragEvent',
        title: 'H5原生拖拽排序',
        componentUrl: 'project/DragEvent.vue',
        status: 3
      },
      {
        path: '/vuedraggable',
        name: 'Vuedraggable',
        title: '第三方库拖拽排序',
        componentUrl: 'project/Vuedraggable.vue',
        status: 3
      },
      {
        path: '/wangeditor',
        name: 'Wangeditor',
        title: '富文本编辑器',
        componentUrl: 'project/Wangeditor.vue',
        status: 3
      },
      {
        path: '/aliUpload',
        name: 'AliUpload',
        title: '阿里云文件上传',
        componentUrl: 'project/AliUpload.vue',
        status: 3
      },
      {
        path: '/deepCheck',
        name: 'DeepCheck',
        title: '多层级多选框',
        componentUrl: 'project/DeepCheck.vue',
        status: 3
      },
      {
        path: '/inputModel',
        name: 'InputModel',
        title: 'input双向绑定',
        componentUrl: 'base/InputModel.vue',
        status: 1
      },
      {
        path: '/computedTest',
        name: 'ComputedTest',
        title: '计算属性的触发',
        componentUrl: 'base/ComputedTest.vue',
        status: 1
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    baseNavInfo(state) {
      return state.routesInfo.filter(item => item.status === 1)
    },
    routerNavInfo(state) {
      return state.routesInfo.filter(item => item.status === 2)
    },
    projectNavInfo(state) {
      return state.routesInfo.filter(item => item.status === 3)
    }
  },
  modules: {
  }
})
