<template>
  <div class="wrapper">
    <speedometer></speedometer>
  </div>
</template>

<script>
import Speedometer from './Dashboard/Speedometer'
export default {
  components: {
    Speedometer
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
