<template>
  <div v-if="$store.getters.experiment === 'wuhan'" class="wrapper">
    <header class="header">
      <span>武汉市交通路网</span>
    </header>
    <roads-info/>
    <speed-line/>
  </div>
  <div v-else class="wrapper">
    <header class="header">
      <span>成都市交通路网</span>
    </header>
    <model-info/>
    <predict-speed/>
  </div>
</template>

<script>
import RoadsInfo from './LeftPanel/RoadsInfo'
import ModelInfo from './LeftPanel/ModelInfo'
import SpeedLine from './LeftPanel/SpeedLine'
import PredictSpeed from './LeftPanel/PredictSpeed'

export default {
  components: {
    SpeedLine,
    RoadsInfo,
    PredictSpeed,
    ModelInfo
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: $leftpanel-width;
  height: $leftpanel-height;
  display: flex;
  flex-direction: column;
  background-color: #333333;
  opacity: $panel-opacity;
  z-index: 1;
  .header {
    padding: 14px;
    border-bottom: 1px solid rgb(64, 64, 66);
    & > span {
      padding: 5px 8px;
      border-radius: 2px;
      width: 50%;
      margin: 0 25%;
      color: $text-color-normal;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
      font-size: 18px;
      font-weight: 900;
      background-color: rgb(71, 178, 117);
      text-align: center;
    }
  }
}
</style>
