<template>
  <div id="container">
    <div id="map"></div>
    <canvas id="deck-canvas"></canvas>
  </div>
</template>

<script>
import { Deck, COORDINATE_SYSTEM } from '@deck.gl/core'
import { TileLayer } from '@deck.gl/geo-layers'
import { VectorTile } from '@mapbox/vector-tile'
import Protobuf from 'pbf'

const mapboxToken =
  'pk.eyJ1IjoiY3N0YW8iLCJhIjoiY2p1eThkYjgzMHNvbzQ0cnhqd3c3OTU1biJ9.vT96vIXE74LTVV4xXrv0Zw'

// const vectorUrl =
//   'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_all_wgs84@EPSG%3A4326@pbf'
const vectorUrl = 'http://localhost:7777/tiles'
const INITIAL_VIEW_STATE = {
  latitude: 30.65,
  longitude: 114.3,
  zoom: 10,
  bearing: 0,
  pitch: 30
}

export default {
  mounted () {
    const mapboxgl = require('mapbox-gl')
    mapboxgl.accessToken = mapboxToken
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/cstao/cjvnekomn17g61dobaihww8d1',
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch
    })
    /* eslint-disable no-new */
    new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({ viewState }) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        })
      },
      layers: [
        new TileLayer({
          coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
          stroked: false,
          getLineColor: [192, 192, 192],
          getFillColor: [140, 170, 180],
          getLineWidth: f => {
            if (f.properties.layer === 'transportation') {
              switch (f.properties.class) {
                case 'primary':
                  return 12
                case 'motorway':
                  return 16
                default:
                  return 6
              }
            }
            return 1
          },
          lineWidthMinPixels: 1,
          getTileData: ({ x, y, z }) => {
            const mapSource = `${vectorUrl}/${z}/${x}/${y}.pbf`
            // const mapSource = `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/${z}/${x}/${y}.vector.pbf?access_token=${mapboxToken}`;
            return fetch(mapSource)
              .then(response => response.arrayBuffer())
              .then(buffer => {
                const tile = new VectorTile(new Protobuf(buffer))
                const features = []
                for (const layerName in tile.layers) {
                  const vectorTileLayer = tile.layers[layerName]
                  for (let i = 0; i < vectorTileLayer.length; i++) {
                    const vectorTileFeature = vectorTileLayer.feature(i)
                    const feature = vectorTileFeature.toGeoJSON(x, y, z)
                    features.push(feature)
                  }
                }
                return features
              })
          }
        })
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#container > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
