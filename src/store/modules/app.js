const app = {
  state: {
    timepoint: 0
  },
  mutations: {
    SET_TIMEPOINT: (state, _timepoint) => {
      state.timepoint = _timepoint
    },
    UPGRADE_TIMEPOINT: (state, max) => {
      state.timepoint += 1
      state.timepoint %= max
    }
  },
  actions: {
  }
}

export default app
