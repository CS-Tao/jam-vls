import Mock from 'mockjs'
import chengduApi from './chengdu.api'
import urls from '../urls'

Mock.setup({
  timeout: '500-1000'
})

Mock.mock(urls.chengdu.properties.regular, urls.chengdu.properties.method, chengduApi.properties)
Mock.mock(urls.chengdu.velocitybyrouteid.regular, urls.chengdu.velocitybyrouteid.method, chengduApi.velocitybyrouteid)
Mock.mock(urls.chengdu.predictvelocites.regular, urls.chengdu.predictvelocites.method, chengduApi.predictvelocites)
Mock.mock(urls.chengdu.modelinfo.regular, urls.chengdu.modelinfo.method, chengduApi.modelinfo)
