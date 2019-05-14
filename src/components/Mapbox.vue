<template>
  <div class="wrapper">
    <div id="map-container"></div>
    <div id="legend"></div>
    <!-- <div class="control-panel">
      <b-collapse class="card">
        <div slot="trigger" slot-scope="props" class="card-header" role="button">
          <p class="card-header-title">Fields</p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
          </a>
        </div>
        <div class="filed-list">
          <div v-for="(property, index) in properties" :key="`${property}${index}`" class="field">
            <b-checkbox
              v-model="selectedPropertyIndexes"
              :native-value="index"
              :type="selectedPropertyIndexes[currentPropertyIndex] === index ? 'is-success' : 'is-info'"
            >{{ property.alias }}</b-checkbox>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">Start</a>
          <a class="card-footer-item">End</a>
        </footer>
      </b-collapse>
    </div>-->
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
const mapboxWorkerCount = 6
const mapboxToken = 'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'
const tileUrl = 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_hour_Project@EPSG%3A900913@pbf'
// const geojsonUrl = 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_hour_Project@EPSG%3A900913@geojson'

export default {
  data () {
    return {
      map: null,
      jsonData: null,
      currentPropertyIndex: 0,
      properties: [],
      selectedPropertyIndexes: []
    }
  },
  async mounted () {
    mapboxgl.accessToken = mapboxToken
    mapboxgl.workerCount = mapboxWorkerCount
    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/cstao/cjvnekomn17g61dobaihww8d1',
      center: [114.2, 30.5],
      zoom: 9
    })
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.on('load', () => {
      this.map.addSource('wuhan_speeded_roads', {
        scheme: 'tms',
        type: 'vector',
        tiles: [`${tileUrl}/{z}/{x}/{y}.pbf`]
      })
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
          'line-color': this.getGradientColor('Workday_18'),
          'line-width': 1
        }
      })
    })
    // try {
    //   let data = await this.$axios.$get(`${tileUrl}/0/0/0.geojson`)
    //   if (data && data.features) {
    //     if (data.features.length) {
    //       this.properties = Object.keys(data.features[0].properties).map(
    //         featureKey => {
    //           return {
    //             alias: featureKey,
    //             field: featureKey
    //           }
    //         }
    //       )
    //       this.selectedPropertyIndexes.length = 0
    //       for (let i in this.properties) {
    //         this.selectedPropertyIndexes.push(parseInt(i))
    //       }
    //     }
    //   } else {
    //     throw Error('无数据')
    //   }
    // } catch (e) {
    //   throw e
    // }
    // setInterval(() => this.chageColor(), 2000);
  },
  methods: {
    check () {
      if (this.map && this.map.isStyleLoaded()) {
        console.log(this.map.getSource('wuhan_speeded_roads'))
      }
    },
    chageColor () {
      if (
        this.map &&
        this.map.isStyleLoaded() &&
        this.selectedPropertyIndexes.length
      ) {
        this.currentPropertyIndex += 1
        this.currentPropertyIndex %= this.selectedPropertyIndexes.length
        this.map.setPaintProperty(
          'wuhan_speeded_roads',
          'line-color',
          this.getGradientColor(
            this.properties[this.selectedPropertyIndexes[this.currentPropertyIndex]].field
          )
        )
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
  display: flex;
  #map-container {
    height: 100%;
    width: 100%;
  }
  .control-panel {
    position: fixed;
    top: 6vh;
    left: 4vw;
    .card {
      .filed-list {
        max-height: 73vh;
        max-width: 300px;
        overflow: auto;
        padding: 10px 20px;
      }
    }
  }
}
</style>
