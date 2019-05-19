import routeVelocity from './data/routeVelocity.js'

export default {
  properties: config => {
    return routeVelocity.map((value, index) => {
      return index
    })
  },
  velocitybyrouteid: config => {
    return {
      routeId: 17256,
      beginTime: 0,
      interval: 1,
      velocites: routeVelocity
    }
  },
  predictvelocites: config => {
    return {
      routeId: 17256,
      beginTime: 0,
      interval: 1,
      velocites: [4.008796, 3.982797, 2.881701, 3.460850, 3.178732, 2.167720, 4.059179, 3.966277, 2.201515, 3.869977]
    }
  },
  modelinfo: config => {
    return {
      routeId: 17256,
      p: 1,
      d: 0,
      q: 1,
      P: 4,
      D: 2,
      Q: 4,
      s: 3
    }
  }
}
