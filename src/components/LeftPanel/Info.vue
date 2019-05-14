<template>
  <div class="info-wrapper">
    <div class="info-key">路网信息</div>
    <div class="roads-info-wrapper">
      <div class="road-info-item">
        <span class="road-info-key">路段数量</span>
        <span class="road-info-value">42646</span>
      </div>
      <div class="road-info-item">
        <span class="road-info-key">拥堵路段</span>
        <span class="road-info-value">10530</span>
      </div>
      <div class="road-info-item">
        <span class="road-info-key">畅通路段</span>
        <span class="road-info-value">35209</span>
      </div>
    </div>
    <div class="info-key">图例</div>
    <div class="legend-wrapper">
      <div class="legend-item" v-for="(legend, index) in legendData" :key="`legend-item-${index}`">
        <span class="legend-key" :style="{backgroundColor: legend.color}"></span>
        <span class="legend-value">{{ legend.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      legendData: [
        {
          color: 'red',
          value: '0 - 10'
        },
        {
          color: 'yellow',
          value: '10 - 20'
        },
        {
          color: 'lime',
          value: '20 - 35'
        },
        {
          color: 'cyan',
          value: '35 - 50'
        },
        {
          color: 'royalblue',
          value: '50 - 60'
        },
        {
          color: 'blue',
          value: '60 以上'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.info-wrapper {
  .info-key {
    color: $text-color-normal;
    font-weight: 800;
    font-size: 18px;
    margin-top: 15px;
    margin-left: 20px;
  }
  .roads-info-wrapper {
    color: $text-color-normal;
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    border-bottom: 1px solid rgb(64, 64, 66);
    .road-info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 3px 40px;
      .road-info-key {
        font-weight: 600;
        &::after {
          content: ''
        }
      }
      .road-info-value {
        font-weight: 100;
      }
    }
  }
  .legend-wrapper {
    display: flex;
    flex-direction: column;
    padding: 5px 30px 10px;
    border-bottom: 1px solid rgb(64, 64, 66);
    .legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px 2px;
      .legend-key {
        width: 100px;
        height: 2px;
      }
      .legend-value {
        color: $text-color-normal;
      }
    }
  }
}
</style>
