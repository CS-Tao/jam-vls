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
  currentColor: state => state.app['chengdu'].currentColor
}

export default getters
