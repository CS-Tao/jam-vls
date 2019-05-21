 <template>
  <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'

export default {
  mixins: [resize],
  props: {
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
  computed: {
    valueList () {
      return this.$store.getters.velocites.velocites
    },
    dateList () {
      return this.$store.getters.timelineProperties
    }
  },
  watch: {
    valueList () {
      this.initChart()
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
      this.chart.on('datazoom', (params) => {
        if (params.batch && params.batch.length) {
          // inside 调用
          this.$store.commit('TIMESPAN_CHANGED', {
            start: params.batch[0].start,
            end: params.batch[0].end
          })
        } else {
          // slider 调用
          this.$store.commit('TIMESPAN_CHANGED', {
            start: params.start,
            end: params.end
          })
        }
      })
    },
    getOptions () {
      return {
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: this.$store.getters.timespan[0],
            end: this.$store.getters.timespan[1]
          },
          {
            type: 'inside',
            realtime: true,
            start: this.$store.getters.timespan[0],
            end: this.$store.getters.timespan[1]
          }
        ],
        visualMap: {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: Math.min(...this.valueList),
          max: Math.max(...this.valueList),
          color: [
            '#196127',
            '#239a3b',
            '#7bc96f',
            '#7bc96f',
            '#ffffff'
          ]
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params, ticket, callback) => {
            if (!params[0].value) {
              return null
            }
            return `${this.formatDate(
              new Date((new Date('2016-11-12 10:00:00')).valueOf() +
                1000 * 60 * parseInt(params[0].name)), 'hh时mm分')}: ${params[0].value.toFixed(2)}m/s`
          }
        },
        xAxis: {
          data: this.dateList,
          axisLine: {
            show: false
          },
          triggerEvent: true
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            show: false
          }
        },
        grid: {
          top: '10%',
          bottom: '50%',
          left: '2%',
          right: '2%'
        },
        series: {
          type: 'line',
          showSymbol: false,
          data: this.valueList
        }
      }
    },
    formatDate (date, formatter = 'yyyy-MM-dd hh:mm:ss') {
      var _complete = function (n) {
        return (n > 9) ? n : '0' + n
      }
      var year = date.getFullYear()
      var month = _complete(date.getMonth() + 1)
      var day = _complete(date.getDate())
      var hour = _complete(date.getHours())
      var min = _complete(date.getMinutes())
      var sec = _complete(date.getSeconds())
      var result = formatter
      result = result.replace('yyyy', year)
      result = result.replace('MM', month)
      result = result.replace('dd', day)
      result = result.replace('hh', hour)
      result = result.replace('mm', min)
      result = result.replace('ss', sec)
      return result
    }
  }
}
</script>
