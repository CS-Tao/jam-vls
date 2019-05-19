 <template>
  <div class="speedline" :id="id" :style="{height:height,width:width}"></div>
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
      this.chart.on('mousemove', (params) => {
        this.$store.commit('CHANGE_CURRENT_COLOR', params.color)
      })
    },
    getOptions () {
      return {
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
          trigger: 'axis'
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
          top: 0,
          bottom: '10%',
          left: '2%',
          right: '2%'
        },
        series: {
          type: 'line',
          showSymbol: false,
          data: this.valueList
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.speedline {
  // min-height: 200px;
}
</style>
