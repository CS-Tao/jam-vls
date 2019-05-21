 <template>
  <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'
import chengduApi from '@/api/chengdu.api'

export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'predict-speed'
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
      chart: null,
      chartData: {}
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
    async initChart () {
      try {
        this.chartData = (await chengduApi.predictvelocites(17256, 10)).data
        this.$store.commit('CHANGE_PREDICT_VELECITIES', this.chartData)
        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption(this.getOptions())
        this.chart.on('click', {dataType: 'node'}, (params) => {
          this.$store.commit('CHANGE_CURRENT_COLOR', params.color)
          this.$store.commit('CHANGE_PREDICT_VELOCITY', params.value)
        })
      } catch (e) {
        console.error(e.message)
      }
    },
    getOptions () {
      return {
        title: {
          top: '5%',
          left: 'center',
          text: `道路速度预测 (id: ${this.chartData.routeId})`,
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          top: '20%',
          bottom: '15%',
          left: '10%',
          right: '10%'
        },
        tooltip: {
          formatter: (params, ticket, callback) => {
            if (!params.value) {
              return null
            }
            return `未来第${params.name}分钟的道路速度为<br/>${params.value.toFixed(2)}m/s`
          }
        },
        xAxis: {
          name: '时间(min)',
          nameLocation: 'center',
          nameGap: 25,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: this.chartData.velocites.map((_, index) => index + 1)
        },
        yAxis: {
          type: 'value',
          name: '速度(m/s)',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {show: false}
        },
        visualMap: {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: Math.min(...this.chartData.velocites),
          max: Math.max(...this.chartData.velocites),
          color: [
            '#196127',
            '#239a3b',
            '#7bc96f',
            '#7bc96f'
          ]
        },
        series: [
          {
            name: '速度预测',
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 30,
            label: {
              normal: {
                show: true
              }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 6],
            data: this.chartData.velocites,
            links: this.chartData.velocites.map((item, i) => {
              return {
                source: i,
                target: i + 1
              }
            }),
            lineStyle: {
              normal: {
                color: '#fff'
              }
            }
          }
        ]
      }
    }
  }
}
</script>
