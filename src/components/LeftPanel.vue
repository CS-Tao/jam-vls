<template>
  <div class="wrapper">
    <header class="header">
      <span>武汉市交通路网</span>
    </header>
    <speed-line></speed-line>
  </div>
</template>

<script>
import SpeedLine from './LeftPanel/SpeedLine'

export default {
  components: {
    SpeedLine
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
      width: 50%;
      margin: 0 25%;
      color: rgb(248, 248, 249);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
        sans-serif;
      font-size: 18px;
      font-weight: 900;
      text-align: center;
    }
  }
}
</style>
