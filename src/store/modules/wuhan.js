const wuhan = {
  state: {
    workdayProperties: [],
    holidayProperties: []
  },
  mutations: {
    INIT_PROPERTIES: (state) => {
      for (let i = 0; i < 24; i++) {
        state.holidayProperties.push(`Holiday_${i === 0 ? 'Ho' : (i < 10 ? `_${i}` : i)}`)
        state.workdayProperties.push(`Workday_${i === 0 ? 'Ho' : (i < 10 ? `_${i}` : i)}`)
      }
    }
  },
  actions: {
  }
}

export default wuhan
