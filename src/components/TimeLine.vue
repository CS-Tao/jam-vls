<template>
  <div class="wrapper">
    <span>{{(new Date('2016-11-12')).toString()}}</span>
    <div class="timeline-wrapper">
      <div @click="pause = !pause" class="btn">
        <svg-icon :icon-class="pause?'pause':'continue'"/>
      </div>
      <div class="slider-wrapper">
        <vue-slider
          class="slider"
          v-model="sliderValue"
          :data="['A', 'B', 'C', 'D']"
          :railStyle="{'backgroundColor': '#555', 'borderRadius': '4px'}"
          :processStyle="{'backgroundColor': '#050505'}"
          :labelStyle="{'backgroundColor': '#555'}"
          :dotOptions="{style: {'backgroundColor': '#555'}, focusStyle: {'boxShadow': '0 0 1px 2px rgba(0, 0, 0, .36)'}}"
          :height="8">
        </vue-slider>
      </div>
    </div>
    <footer></footer>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: { VueSlider },
  data () {
    return {
      pause: true,
      sliderValue: 1
    }
  },
  mounted () {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";
.wrapper {
  position: fixed;
  top: $leftpanel-height;
  left: $dashboard-width;
  width: $timeline-width;
  height: $timeline-height;
  display: flex;
  flex-direction: column;
  background-color: #333333;
  opacity: $panel-opacity;
  z-index: 1;
  padding-top: 15px;
  color: rgb(248, 248, 249);
  box-sizing: border-box;
  & > span {
    padding: 0 15px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
      sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
  .timeline-wrapper {
    flex-grow: 1;
    margin-top: 30px;
    margin-left: 20px;
    display: flex;
    .btn {
      margin-top: 4px;
      cursor: pointer;
    }
    .slider-wrapper {
      flex-grow: 1;
      display: block;
      .label {
        font-size: 16px;
      }
      .slider {
        margin: 0 25px 0 20px;
      }
    }
  }
  & > footer {
    height: 35px;
    border-top: 1px solid rgb(64, 64, 66);
  }
}
</style>
