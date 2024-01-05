<template>
  <div class="container" ref="container">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  data() {
    return {
      res: {
        details: {
          isDigital: true,
          monitorSeriesList: [
            {
              // 数据点
              digitalValues: [
                0
              ],
              monitorObject: 'string',
              stringValues: [
                'string'
              ]
            }
          ],
          // 时间x轴
          monitorSeriesTimeline: [
            0
          ],
          // y轴类型判断
          monitorUnit: 'string',
          title: 'string'
        },
        message: 'string'
      }
    }
  },
  mounted() {
    var chartDom = this.$refs.container
    var myChart = echarts.init(chartDom)
    var option

    option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    }

    option && myChart.setOption(option)
  }
}
</script>

<style>
.container {
  width: 600px;
  height: 600px;
  margin: 100px auto;
}
</style>
