 <template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'speedometer'
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
  computed: {
    isms () {
      return this.$store.getters.experiment === 'chengdu'
    },
    velocity () {
      return this.$store.getters.currentVelocity * (this.isms ? 3.6 : 1)
    },
    minV () {
      return this.$store.getters.minVelocity * (this.isms ? 3.6 : 1)
    },
    maxV () {
      return this.$store.getters.maxVelocity * (this.isms ? 3.6 : 1)
    },
    predictVelocity () {
      return this.$store.getters.predictVelocity * (this.isms ? 3.6 : 1)
    }
  },
  watch: {
    velocity () {
      this.chart.setOption(this.getOptions())
    },
    minV () {
      this.chart.setOption(this.getOptions())
    },
    maxV () {
      this.chart.setOption(this.getOptions())
    },
    predictVelocity () {
      this.chart.setOption(this.getOptions(
        this.predictVelocity,
        Math.min(...this.$store.getters.predictVelocities.velocites) * (this.isms ? 3.6 : 1),
        Math.max(...this.$store.getters.predictVelocities.velocites) * (this.isms ? 3.6 : 1))
      )
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
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.getOptions())
    },
    getOptions (v, minV, maxV, routeId) {
      v = v === undefined ? this.velocity : v
      minV = minV === undefined ? this.minV : minV
      maxV = maxV === undefined ? this.maxV : maxV
      return {
        tooltip: {
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: '平均速度',
            type: 'gauge',
            z: 3,
            min: Math.floor(minV),
            max: Math.ceil(maxV),
            splitNumber: Math.floor((Math.ceil(maxV) - Math.floor(minV)) / 5),
            radius: '80%',
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 1
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 5, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: {
              // 分隔线
              length: 8, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 5
            },
            axisLabel: {
              backgroundColor: 'transparent',
              color: '#eee',
              fontSize: 8,
              formatter: (value) => {
                return parseInt(value)
              }
            },
            title: {
              fontWeight: 'bolder',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#eee'
            },
            detail: {
              // formatter: function (value) {
              //   value = (value + '').split('.')
              //   value.length < 2 && value.push('00')
              //   return (
              //     ('00' + value[0]).slice(-2) +
              //     '.' +
              //     (value[1] + '00').slice(0, 2)
              //   )
              // },
              fontWeight: 'bolder',
              borderRadius: 3,
              backgroundColor: '#444',
              borderColor: '#aaa',
              shadowBlur: 5,
              shadowColor: '#333',
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: 'Arial',
              fontSize: 12,
              width: 16,
              color: '#eee',
              rich: {}
            },
            data: [{
              value: v.toFixed(2),
              name: 'km/h'
            }]
          }, {
            name: '最高速',
            type: 'gauge',
            center: ['80%', '70%'],
            radius: '70%',
            min: 0,
            max: 120,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 4
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 8, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '60':
                    return 'Max'
                  case '120':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              value: maxV.toFixed(2),
              name: 'km/h'
            }]
          },
          {
            name: '最低速',
            type: 'gauge',
            center: ['20%', '70%'],
            radius: '70%',
            min: 0,
            max: 120,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 4
              }
            },
            axisTick: {
              // 坐标轴小标记
              splitNumber: 5,
              length: 8, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return 'L'
                  case '60':
                    return 'Min'
                  case '120':
                    return 'H'
                }
              }
            },
            splitLine: {
              // 分隔线
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
              value: minV.toFixed(2),
              name: 'km/h'
            }]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
