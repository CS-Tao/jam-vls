<template>
  <div class="wrapper">
    <div id="map-container"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'

const mapboxWorkerCount = 6
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'
const tileUrl = 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_hour_Project@EPSG%3A900913@pbf'
// const geojsonUrl = 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_hour_Project@EPSG%3A900913@geojson'
// const tileUrl = 'http://localhost:7777/tiles'
export default {
  data () {
    return {
      map: null,
      jsonData: null,
      workdayProperties: [],
      holidayProperties: []
    }
  },
  computed: {
    showProperties () {
      return this.$store.state.wuhan.workdayProperties
    },
    currentPropertyIndex () {
      return this.$store.state.app.timepoint
    }
  },
  mounted () {
    mapboxgl.accessToken = mapboxToken
    mapboxgl.workerCount = mapboxWorkerCount
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cstao/cjvnekomn17g61dobaihww8d1',
      center: [114.2, 30.5],
      zoom: 10
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.on('load', () => {
      this.map.addSource('wuhan_speeded_roads', {
        scheme: 'tms',
        type: 'vector',
        tiles: [`${tileUrl}/{z}/{x}/{y}.pbf`]
      })
      this.$store.commit('INIT_PROPERTIES')
      this.map.addLayer({
        id: 'wuhan_speeded_roads',
        type: 'line',
        source: 'wuhan_speeded_roads',
        'source-layer': 'main_with_speed_hour_Project',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': this.getGradientColor(this.showProperties[0]),
          'line-width': 1
        }
      })
      setInterval(() => {
        // requestAnimationFrame(this.changeColor)
        this.changeColor()
      }, 2000)
    })
  },
  methods: {
    check () {
      if (this.map && this.map.isStyleLoaded()) {
        console.log(this.map.getSource('wuhan_speeded_roads'))
      }
    },
    changeColor () {
      if (
        this.map &&
        this.map.isStyleLoaded()
      ) {
        this.$store.commit('UPGRADE_TIMEPOINT', this.showProperties.length)
        this.map.setPaintProperty(
          'wuhan_speeded_roads',
          'line-color',
          this.getGradientColor(
            this.showProperties[this.currentPropertyIndex]
          )
        )
        console.log(this.showProperties[this.currentPropertyIndex])
      }
    },
    getRandomColor () {
      return (
        '#' +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padEnd(6, '0')
      )
    },
    getGradientColor (property) {
      return [
        'interpolate',
        ['linear'],
        ['get', property],
        0,
        'red',
        10,
        'yellow',
        20,
        'lime',
        35,
        'cyan',
        50,
        'royalblue',
        60,
        'blue'
      ]
    },
    getGradientOpacity (property) {
      return [
        'interpolate',
        ['linear'],
        ['get', property],
        0,
        1,
        10,
        0.8,
        20,
        0.65,
        35,
        0.5,
        50,
        0.35,
        60,
        0.2
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  #map-container {
    height: 100%;
    width: 100%;
  }
}
</style>
