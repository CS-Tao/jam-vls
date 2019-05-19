<template>
  <div class="wrapper">
    <span v-if="$store.getters.experiment === 'wuhan'">{{(new Date('2016-11-12')).toString()}}</span>
    <div v-if="$store.getters.experiment === 'wuhan'" class="timeline-wrapper">
      <div @click="pause = !pause" class="btn">
        <svg-icon :icon-class="pause?'pause':'continue'"/>
      </div>
      <div class="slider-wrapper">
        <vue-slider
          class="slider"
          v-model="sliderValue"
          :lazy="true"
          :data="sliderData"
          :railStyle="{'backgroundColor': '#555', 'borderRadius': '4px'}"
          :processStyle="{'backgroundColor': '#050505'}"
          :labelStyle="{'backgroundColor': '#555'}"
          :dotOptions="{style: {'backgroundColor': '#555'}, focusStyle: {'boxShadow': '0 0 1px 2px rgba(0, 0, 0, .36)'}}"
          :height="8">
        </vue-slider>
      </div>
    </div>
    <speedLine v-else/>
    <footer></footer>
  </div>
</template>

<script>
import SpeedLine from './TimeLine/SpeedLine'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: { VueSlider, SpeedLine },
  data () {
    return {
      pause: true
    }
  },
  computed: {
    sliderData () {
      return this.$store.getters.timelineProperties
    },
    sliderValue: {
      get () {
        return this.$store.getters.timepoint
      },
      set (value) {
        this.$store.commit('SET_TIMEPOINT', value)
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('initProperties', 222)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
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
  color: $text-color-normal;
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
