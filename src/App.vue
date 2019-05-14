<template>
  <section class="main">
    <left-panel></left-panel>
    <dashboard></dashboard>
    <time-line></time-line>
    <map-box class="mapbox"></map-box>
  </section>
</template>

<script>
import MapBox from '@/components/Mapbox'
import LeftPanel from '@/components/LeftPanel'
import Dashboard from '@/components/Dashboard'
import TimeLine from '@/components/TimeLine'

export default {
  components: {
    MapBox,
    LeftPanel,
    Dashboard,
    TimeLine
  }
}
</script>

<style lang="scss" scpoed>
.main {
  min-height: 100vh;
  .mapbox {
    width: 100vw;
    height: 100vh;
  }
}
</style>
