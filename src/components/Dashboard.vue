<template>
  <div class="wrapper">
    <speedometer0 v-if="$store.getters.experiment === 'wuhan'"></speedometer0>
    <speedometer1 v-else></speedometer1>
  </div>
</template>

<script>
import Speedometer0 from './Dashboard/Speedometer.0'
import Speedometer1 from './Dashboard/Speedometer.1'

export default {
  components: {
    Speedometer0,
    Speedometer1
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.wrapper {
  position: fixed;
  top: $leftpanel-height;
  left: 0;
  width: $dashboard-width;
  height: $dashboard-height;
  display: flex;
  flex-direction: column;
  background-color: #333333;
  opacity: $panel-opacity;
  z-index: 1;
  border-top: solid 1px #000;
  border-right: solid 1px #000;
  box-sizing: border-box;
}
</style>
