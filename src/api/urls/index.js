const urls = {
  chengdu: {
    properties: {
      url () {
        return '/rest/chengdu/properties'
      },
      regular: /\/rest\/chengdu\/properties/,
      method: 'get'
    },
    velocitybyrouteid: {
      url () {
        return '/rest/chengdu/velocitybyrouteid'
      },
      regular: /\/rest\/chengdu\/velocitybyrouteid/,
      method: 'get'
    },
    predictvelocites: {
      url () {
        return '/rest/chengdu/predictvelocites'
      },
      regular: /\/rest\/chengdu\/predictvelocites/,
      method: 'get'
    },
    modelinfo: {
      url () {
        return '/rest/chengdu/modelinfo'
      },
      regular: /\/rest\/chengdu\/modelinfo/,
      method: 'get'
    }
  }
}

export default urls
