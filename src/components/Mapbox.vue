<template>
  <div class="wrapper">
    <div id="map-container"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import mapboxgl from 'mapbox-gl'

const mapboxWorkerCount = 6
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'
const sourceId = 'routes'
const layerId = 'routes'
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
    ...mapGetters({
      experiment: 'experiment',
      sourceLayerName: 'sourceLayerName',
      tileUrl: 'tileLayerURL',
      center: 'mapCenter',
      initZoom: 'mapInitZoom',
      velocites: 'velocites',
      currentColor: 'currentColor'
    }),
    currentProperty () {
      return this.$store.getters.timepoint
    }
  },
  watch: {
    tileUrl () {
      this.changeLayer(this.tileUrl)
    },
    currentProperty () {
      if (this.experiment === 'wuhan') {
        requestAnimationFrame(this.changeAllColorByProp)
      } else {
        requestAnimationFrame(this.changeColorById)
      }
    },
    currentColor () {
      this.changeColorById()
    }
  },
  mounted () {
    mapboxgl.accessToken = mapboxToken
    mapboxgl.workerCount = mapboxWorkerCount
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cstao/cjvnekomn17g61dobaihww8d1',
      center: this.center,
      zoom: this.initZoom
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.on('load', () => {
      this.changeLayer(this.tileUrl)
    })
  },
  methods: {
    changeAllColorByProp () {
      if (this.map && this.map.isStyleLoaded()) {
        var gradientColor = this.getGradientColor(this.currentProperty)
        this.map.setPaintProperty(layerId, 'line-color', gradientColor)
      }
    },
    changeColorById () {
      if (this.map && this.map.isStyleLoaded()) {
        this.map.setPaintProperty(layerId, 'line-color', [
          'step',
          ['get', 'fid_1'],
          'white',
          this.velocites.routeId,
          this.currentColor,
          this.velocites.routeId + 1,
          'white'
        ])
        this.map.setPaintProperty(layerId, 'line-width', [
          'step',
          ['get', 'fid_1'],
          1,
          this.velocites.routeId,
          10,
          this.velocites.routeId + 1,
          1
        ])
      }
    },
    getRandomColor () {
      return '#' + Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')
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
    },
    changeLayer (tileUrl) {
      tileUrl = tileUrl || this.tileUrl
      if (this.map.getLayer(layerId)) {
        this.map.removeLayer(layerId)
      }
      if (this.map.getSource(sourceId)) {
        this.map.removeSource(sourceId)
      }
      if (this.experiment === 'wuhan') {
        this.map
          .addSource(sourceId, {
            scheme: 'tms',
            type: 'vector',
            tiles: [`${tileUrl}/{z}/{x}/{y}.pbf`]
          })
          .addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            'source-layer': this.sourceLayerName,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': this.getGradientColor(this.currentProperty),
              'line-width': 1
            }
          })
          .flyTo({
            center: this.center,
            zoom: this.initZoom
          })
      } else {
        this.map
          .addSource(sourceId, {
            scheme: 'tms',
            type: 'vector',
            tiles: [`${tileUrl}/{z}/{x}/{y}.pbf`]
          })
          .addLayer({
            id: layerId,
            type: 'line',
            source: sourceId,
            'source-layer': this.sourceLayerName,
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': [
                'step',
                ['get', 'fid_1'],
                'white',
                this.velocites.routeId,
                this.currentColor,
                this.velocites.routeId + 1,
                'white'
              ],
              'line-width': [
                'step',
                ['get', 'fid_1'],
                1,
                this.velocites.routeId,
                5,
                this.velocites.routeId + 1,
                1
              ]
            }
          })
          .flyTo({
            center: this.center,
            zoom: this.initZoom
          })
      }
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
