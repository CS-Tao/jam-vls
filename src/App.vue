<template>
  <section class="main">
    <left-panel></left-panel>
    <dashboard></dashboard>
    <time-line></time-line>
    <switch-control></switch-control>
    <map-box></map-box>
  </section>
</template>

<script>
import MapBox from '@/components/Mapbox'
import LeftPanel from '@/components/LeftPanel'
import Dashboard from '@/components/Dashboard'
import TimeLine from '@/components/TimeLine'
import SwitchControl from '@/components/SwitchControl'

export default {
  components: {
    MapBox,
    LeftPanel,
    Dashboard,
    TimeLine,
    SwitchControl
  }
}
</script>

<style lang="scss" scpoed>
.main {
  min-height: 100vh;
}
</style>
