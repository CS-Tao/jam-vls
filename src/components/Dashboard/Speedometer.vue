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
          formatter: '{a} <br/>{c} {b}'
        },
        toolbox: {
          show: false
        },
        series: [
          {
            name: '速度',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 220,
            splitNumber: 11,
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
              fontSize: 8
            },
            title: {
              fontWeight: 'bolder',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#eee'
            },
            detail: {
              formatter: function (value) {
                value = (value + '').split('.')
                value.length < 2 && value.push('00')
                return (
                  ('00' + value[0]).slice(-2) +
                  '.' +
                  (value[1] + '00').slice(0, 2)
                )
              },
              fontWeight: 'bolder',
              borderRadius: 3,
              backgroundColor: '#444',
              borderColor: '#aaa',
              shadowBlur: 5,
              shadowColor: '#333',
              shadowOffsetX: 0,
              shadowOffsetY: 3,
              borderWidth: 2,
              textBorderColor: '#000',
              textBorderWidth: 2,
              textShadowBlur: 2,
              textShadowColor: '#fff',
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              fontFamily: 'Arial',
              fontSize: 12,
              width: 18,
              color: '#eee',
              rich: {}
            },
            data: [{ value: 40, name: 'km/h' }]
          },
          {
            name: '转速',
            type: 'gauge',
            center: ['20%', '55%'], // 默认全局居中
            radius: '75%',
            min: 0,
            max: 7,
            endAngle: 45,
            splitNumber: 7,
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                width: 4
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 8, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: 'auto'
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
              width: 4
            },
            title: {
              offsetCenter: [0, '-30%']
            },
            detail: {
              fontWeight: 'bolder'
            },
            data: [{ value: 1.5, name: 'x1000 r/min' }]
          },
          {
            name: '油表',
            type: 'gauge',
            center: ['80%', '50%'],
            radius: '70%',
            min: 0,
            max: 2,
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
                    return 'E'
                  case '1':
                    return 'Gas'
                  case '2':
                    return 'F'
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
            data: [{ value: 0.5, name: 'gas' }]
          },
          {
            name: '水表',
            type: 'gauge',
            center: ['80%', '50%'], // 默认全局居中
            radius: '70%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
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
              show: false
            },
            axisLabel: {
              formatter: function (v) {
                switch (v + '') {
                  case '0':
                    return 'H'
                  case '1':
                    return 'Water'
                  case '2':
                    return 'C'
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
            data: [{ value: 0.5, name: 'gas' }]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
