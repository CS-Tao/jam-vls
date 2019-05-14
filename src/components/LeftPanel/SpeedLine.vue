 <template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'
var category = []
var dottedBase = +new Date()
var lineData = []
var barData = []

for (var i = 0; i < 20; i++) {
  var date = new Date(dottedBase += 3600 * 24 * 1000)
  category.push([
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].join('-'))
  var b = Math.random() * 60 + 10
  var d = Math.random() * 60 + 10
  barData.push(b)
  lineData.push(d + b)
}

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'speedline'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },

  data () {
    return {
      chart: null
    }
  },

  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    num (newData, oldData) {
      this.initChart()
    }
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.getOptions())
    },
    getOptions () {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Average speed', 'Max speed'],
          textStyle: {
            color: '#ccc'
          },
          top: '3%'
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        series: [{
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: 'lime'
            }
          },
          data: lineData
        }, {
          name: 'Average speed',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#555'},
                  {offset: 1, color: '#555'}
                ]
              )
            }
          },
          data: barData
        }, {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: 'rgba(20,200,212,0.5)'},
                  {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                  {offset: 1, color: 'rgba(20,200,212,0)'}
                ]
              )
            }
          },
          z: -12,
          data: lineData
        }, {
          name: 'Max speed',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            normal: {
              color: '#0f375f'
            }
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
