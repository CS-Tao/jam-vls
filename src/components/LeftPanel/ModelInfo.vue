<template>
  <div class="info-wrapper">
    <div class="info-key">ARIMA 模型参数</div>
    <div class="model-info-wrapper">
      <div class="model-info-item">
        <span class="model-info-key">非平稳MA阶数</span>
        <span class="model-info-value">{{modelInfo.p}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">非平稳AR阶数</span>
        <span class="model-info-value">{{modelInfo.q}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">非平稳差分阶数</span>
        <span class="model-info-value">{{modelInfo.d}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">季节MA阶数</span>
        <span class="model-info-value">{{modelInfo.P}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">季节AR阶数</span>
        <span class="model-info-value">{{modelInfo.Q}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">季节差分阶数</span>
        <span class="model-info-value">{{modelInfo.D}}</span>
      </div>
      <div class="model-info-item">
        <span class="model-info-key">季节周期</span>
        <span class="model-info-value">{{modelInfo.s}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import chengduApi from '@/api/chengdu.api'

export default {
  data () {
    return {
      modelInfo: {
        routeId: 0,
        p: 0,
        d: 0,
        q: 0,
        P: 0,
        D: 0,
        Q: 0,
        s: 0
      }
    }
  },
  async mounted () {
    try {
      this.modelInfo = (await chengduApi.modelinfo(17256)).data
    } catch (e) {
      console.error(e.message)
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
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
  }
  .model-info-wrapper {
    color: $text-color-normal;
    display: flex;
    flex-direction: column;
    padding: 5px 10px 10px;
    border-bottom: 1px solid rgb(64, 64, 66);
    .model-info-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 2px 40px;
      border-bottom: 1px solid rgb(64, 64, 66);
      font-size: 14px;
      .model-info-key {
        font-weight: 400;
        &::after {
          content: ''
        }
      }
      .model-info-value {
        font-weight: 100;
      }
    }
  }
}
</style>
