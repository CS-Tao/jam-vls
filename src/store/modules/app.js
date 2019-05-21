import chengduApi from '@/api/chengdu.api'

const experiments = [
  'wuhan',
  'chengdu'
]

const app = {
  state: {
    experiment: experiments[1],
    wuhan: {
      timepoint: 'Workday_Ho',
      workdayProperties: [],
      holidayProperties: [],
      sourceLayerName: 'main_with_speed_hour_Project',
      tileLayerURL: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/wuhan_taxi_speed%3Amain_with_speed_hour_Project@EPSG%3A900913@pbf',
      center: [114.2, 30.5],
      initZoom: 10,
      timespan: [30, 70]
    },
    chengdu: {
      timepoint: 0,
      timelineProperties: [],
      tileLayerURL: 'http://localhost:8080/geoserver/gwc/service/tms/1.0.0/chengdu_didi_routes%3Achengdu_2@EPSG%3A900913@pbf',
      center: [104.06, 30.66],
      sourceLayerName: 'chengdu_2',
      initZoom: 13,
      velocites: {
        routeId: 17256,
        beginTime: 0,
        interval: 1,
        velocites: []
      },
      currentColor: 'white',
      timespan: [30, 70],
      predictVelocity: -1,
      predictVelocities: {
        routeId: 17256,
        beginTime: 0,
        interval: 1,
        velocites: []
      }
    }
  },
  mutations: {
    SWITCH_EXPERIMENT: (state, experimentIndex) => {
      state.experiment = experiments[experimentIndex]
    },
    INIT_PROPERTIES: (state, properties) => {
      if (state.experiment === experiments[0]) {
        for (let i = 0; i < 24; i++) {
          state[state.experiment].holidayProperties.push(`Holiday_${i === 0 ? 'Ho' : (i < 10 ? `_${i}` : i)}`)
          state[state.experiment].workdayProperties.push(`Workday_${i === 0 ? 'Ho' : (i < 10 ? `_${i}` : i)}`)
        }
      } else {
        state[state.experiment].timelineProperties = properties
      }
    },
    INIT_VELOCITIES: (state, velocites) => {
      state[experiments[1]].velocites = velocites
    },
    SET_TIMEPOINT: (state, timepoint) => {
      state[state.experiment].timepoint = timepoint
    },
    UPGRADE_TIMEPOINT: (state, max) => {
      if (state.experiment === experiments[0]) {
        var currentIndex = state[experiments[0]].workdayProperties.findIndex((value) => {
          return value === state[experiments[0]].timepoint
        })
        state[experiments[0]].timepoint = state[experiments[0]].workdayProperties[(currentIndex + 1) % state[experiments[0]].workdayProperties.length]
      } else {
        state[experiments[1]].timepoint += 1
        state[experiments[1]].timepoint %= max
      }
    },
    CHANGE_CURRENT_COLOR: (state, color) => {
      state['chengdu'].currentColor = color
    },
    CHANGE_PREDICT_VELOCITY: (state, predictVelocity) => {
      state['chengdu'].predictVelocity = predictVelocity
    },
    CHANGE_PREDICT_VELECITIES: (state, velocities) => {
      state['chengdu'].predictVelocities = velocities
    },
    TIMESPAN_CHANGED: (state, timespan) => {
      state[state.experiment].timespan = [timespan.start, timespan.end]
    }
  },
  actions: {
    initProperties: async ({commit, state}, routeid) => {
      if (state.experiment === experiments[0]) {
        commit('INIT_PROPERTIES')
      } else {
        try {
          var {data} = await chengduApi.properties()
          commit('INIT_PROPERTIES', data)
          var response = await chengduApi.velocitybyrouteid(routeid)
          commit('INIT_VELOCITIES', response.data)
        } catch (e) {
          console.error(e.message)
        }
      }
    }
  }
}

export default app
