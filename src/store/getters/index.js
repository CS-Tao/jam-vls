const getters = {
  experiment: state => state.app.experiment,
  timelineProperties: state => state.app.experiment === 'wuhan'
    ? state.app.wuhan.workdayProperties
    : state.app.chengdu.timelineProperties,
  timepoint: state => state.app[state.app.experiment].timepoint,
  sourceLayerName: state => state.app[state.app.experiment].sourceLayerName,
  tileLayerURL: state => state.app[state.app.experiment].tileLayerURL,
  mapCenter: state => state.app[state.app.experiment].center,
  mapInitZoom: state => state.app[state.app.experiment].initZoom,
  velocites: state => state.app['chengdu'].velocites,
  currentColor: state => state.app['chengdu'].currentColor,
  minVelocity: state => Math.min(...state.app['chengdu'].velocites.velocites.filter((_, index) => {
    return index >= Math.floor(state.app['chengdu'].velocites.velocites.length * (state.app['chengdu'].timespan[0] / 101)) &&
      index <= Math.floor(state.app['chengdu'].velocites.velocites.length * (state.app['chengdu'].timespan[1] / 101))
  })),
  maxVelocity: state => Math.max(...state.app['chengdu'].velocites.velocites.filter((_, index) => {
    return index >= Math.floor(state.app['chengdu'].velocites.velocites.length * (state.app['chengdu'].timespan[0] / 101)) &&
      index <= Math.floor(state.app['chengdu'].velocites.velocites.length * (state.app['chengdu'].timespan[1] / 101))
  })),
  timespan: state => state.app[state.app.experiment].timespan,
  predictVelocity: state => state.app['chengdu'].predictVelocity,
  predictVelocities: state => state.app['chengdu'].predictVelocities,
  currentVelocity: state => state.app['chengdu'].velocites
    .velocites[Math.floor(state.app['chengdu'].velocites.velocites.length * (state.app['chengdu'].timespan[1] / 101))]
}

export default getters
