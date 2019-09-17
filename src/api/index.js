import axios from '../lib/ajaxRequest'

// 获取品牌
export const getBrand = params => axios.request({
  method: 'get',
  url: '/product/ps/carBrandInfo/findList',
  params
})

// 获取车系
export const getCarSeries = params => axios.request({
  method: 'get',
  url: '/product/ps/carSeriesInfo/findList',
  params
})

// 获取车型
export const getCardModel = params => axios.request({
  method: 'get',
  url: '/product/ps/carTypeInfo/findList',
  params
})

// 授权
export const authorization = params => axios.request({
  method: 'get',
  url: '/order/ws/authback',
  params
})

// 获取客户信息
export  const getUserInfo = params => axios.request({
  method: 'get',
  url: '/customer/cs/cuPersonalInfo/getInfo',
  params
})

/**
 * 获取验证id
 * @param params
 * @return {AxiosPromise}
 */
export  const getVid = params => axios.request({
  method: 'get',
  url: '/order/ws/vid',
  params
})
