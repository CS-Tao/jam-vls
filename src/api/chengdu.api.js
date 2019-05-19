import request from './config'
import urls from './urls'

export default {
  properties: (routeid) => {
    return request({
      url: urls.chengdu.properties.url(),
      method: urls.chengdu.properties.method
    })
  },
  velocitybyrouteid: (routeid) => {
    return request({
      url: urls.chengdu.velocitybyrouteid.url(),
      method: urls.chengdu.velocitybyrouteid.method,
      params: { routeid }
    })
  },
  predictvelocites: (routeid, ahead) => {
    return request({
      url: urls.chengdu.predictvelocites.url(),
      method: urls.chengdu.predictvelocites.method,
      params: { routeid, ahead }
    })
  },
  modelinfo: (routeid) => {
    return request({
      url: urls.chengdu.modelinfo.url(),
      method: urls.chengdu.modelinfo.method,
      params: { routeid }
    })
  }
}
