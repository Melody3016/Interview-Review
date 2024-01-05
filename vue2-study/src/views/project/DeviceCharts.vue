<template>
  <div class="org-chart">
    <div id="tree" ref="tree"></div>
  </div>
</template>

<script>
import OrgChart from '@balkangraph/orgchart.js'
import image1 from '@/assets/images/normal.png'
export default {
  name: 'OrgChart',
  props: ['nodesData'],
  data() {
    return {
      chartData: {},
      nodes: [
        { id: 1, name: '蜂网BeeEdge', title: '云', img: 'https://cdn.balkan.app/shared/2.jpg' },
        { id: 2, pid: 1, name: '[设备名称]', title: '直连网关', img: 'https://cdn.balkan.app/shared/3.jpg' },
        { id: 3, pid: 1, name: '[设备名称]', title: '直连网关', img: 'https://cdn.balkan.app/shared/4.jpg' },
        { id: 4, pid: 1, name: '[设备名称]', title: '直连设备', img: 'https://cdn.balkan.app/shared/5.jpg' },
        { id: 5, pid: 2, name: 'Lynn Hussain', title: 'Sales', img: 'https://cdn.balkan.app/shared/6.jpg' },
        { id: 6, pid: 4, name: 'Tanner May', title: 'Developer', img: 'https://cdn.balkan.app/shared/7.jpg' },
        { id: 7, pid: 4, name: 'Fran Parsons1', title: 'Developer', img: 'https://cdn.balkan.app/shared/8.jpg' },
        { id: 8, pid: 3, name: 'Fran Parsons2', title: 'Developer', img: 'https://cdn.balkan.app/shared/9.jpg' },
        { id: 9, pid: 3, name: 'Fran Parsons3', title: 'Developer', img: 'https://cdn.balkan.app/shared/10.jpg' },
        { id: 10, pid: 8, name: 'Fran Parsons4', title: 'Developer', img: 'https://cdn.balkan.app/shared/11.jpg' }
      ]
    }
  },

  watch: {
    // 设备功能里面的选项卡
    /* nodesData: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.nodes = this.nodesDataPress(newVal)
          this.$nextTick(() => {
            this.mytree(this.$refs.tree, this.nodes)
          })
        }
      },
      deep: true,
      immediate: false
    } */
  },
  mounted() {
    this.mytree(this.$refs.tree, this.nodes)
  },
  methods: {
    /* nodesDataPress(nodesData) {
      let arr = []
      if (nodesData.items.length > 0) {
        nodesData.items.forEach((element) => {
          element.pid = element.parentName
          element.id = element.name
          arr.push(element)
        })
      }
      return arr
    }, */

    mytree: function (domEl, x) {
      this.chart = new OrgChart(domEl, {
        template: 'grey',
        enableSearch: false,
        enableDragDrop: true,
        scaleInitial: OrgChart.match.boundary,
        mode: 'light',

        tags: {
          Management: {
            template: 'rony'
          },
          'IT Manager': {
            template: 'ana'
          },
          IT: {
            template: 'ula'
          },
          Marketing: {
            template: 'belinda'
          }
        },
        nodes: x,
        nodeBinding: {
          field_0: 'name',
          field_1: 'title',
          // img_0: 'picURL'
          img_0: 'img'
        },
        menu: {
          pdf: { text: 'Export PDF' },
          png: { text: 'Export PNG' },
          svg: { text: 'Export SVG' },
          csv: { text: 'Export CSV' }
        },
        toolbar: {
          zoom: true,
          layout: true, // 排列方式变化
          fit: true,
          fullScreen: false
        },
        collapse: {
          level: 2
        },
        expand: {
          nodes: [3],
          allChildren: true
        }
      })

      OrgChart.toolbarUI.zoomInIcon = `<img width="24" src='${image1}' />`
      OrgChart.toolbarUI.zoomOutIcon = `<img width="24" src='${image1}' />`
      OrgChart.toolbarUI.fitIcon = `<img width="24" src='${image1}' />` // 适配整个屏幕  最好的比例
      OrgChart.toolbarUI.layoutIcon = `<img width="24" src='${image1}' />` // 排列方式变化
      OrgChart.toolbarUI.fullScreenIcon = `<img width="24" src='${image1}' />`

      OrgChart.templates.grey = Object.assign({}, OrgChart.templates.ana)
      OrgChart.templates.grey.size = [200, 210] // 一个模块的大小
      OrgChart.templates.grey.node =
        '<rect x="10" y="0" rx="5" ry="5" height="172" width="200" fill="#ffffff" ></rect>' +
        '<path d="M82,70 C82,50 118,50 118,70" stroke="#757575" stroke-width="1" fill="#757575"></path>'

      OrgChart.templates.grey.minus =
        '<circle x="10" y="5" cx="15" cy="-10" r="10" fill="#0887FF" stroke="#FFFFFF" stroke-width="1"></circle>' +
        '<line x1="9" y1="-10" x2="21" y2="-10" stroke-width="2" stroke="#FFFFFF"></line>'
      OrgChart.templates.grey.plus =
        '<circle   x="10" y="5" cx="15" cy="-10" r="10" fill="#0887FF" stroke="#FFFFFF" stroke-width="1"></circle>' +
        '<line x1="9" y1="-10" x2="21" y2="-10" stroke-width="2" stroke="#FFFFFF"></line>' +
        '<line x1="15" y1="-16" x2="15" y2="-4" stroke-width="2" stroke="#FFFFFF"></line>'

      OrgChart.templates.grey.linkAdjuster = {
        fromX: 0,
        fromY: 0,
        toX: 0,
        toY: -13
      }

      OrgChart.templates.grey.img_0 =
        '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="50" y="5"  width="100" height="100"></image>' +
        '<rect fill="none" stroke="#CCCCCC" stroke-width="1" x="45" y="1" rx="10" ry="10" width="110" height="110"></rect>'

      OrgChart.templates.grey.field_0 =
        '<text style="font-size: 14px;font-weight: bold;" fill="#000000" x="100" y="135" text-anchor="middle">{val}</text>'

      OrgChart.templates.grey.field_1 =
        '<text style="font-size: 12px;" fill="#999999" x="105" y="160" text-anchor="middle">{val}</text>'

      this.chart.on('click', function (sender, args) {
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.org-chart {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  cursor: pointer;
  ::v-deep .node {
    border-color: #fff;
    box-shadow: unset;
  }
  ::v-deep .link path {
    stroke: #0887ff !important;
    x: 10;
  }
  ::v-deep .boc-toolbar-container {
    // background-color: #fff;
    display: flex;
    top: 0;
    margin-right: 50px;
    position: absolute;
    height: 50px;
    div {
      margin: 10px;
    }
    data-tlbr {
      background-color: #fff;
    }
  }
  ::v-deep [data-ctrl-menu] {
    fill: #bfbfbf;
    background-color: red;
    position: absolute;
    right: 30px;
    top: 11px !important;
    width: 24px !important;
    height: 24px !important;
    // background: url('~@/assets/images/topology/5.png') center no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    hr {
      display: none;
    }
  }
  ::v-deep .boc-light {
    svg {
      background: #fff !important;
    }
  }
  .field_1 {
    fill: #cfcfcf;
  }
  #tree {
    width: 100%;
    height: 100%;
  }
}
</style>
