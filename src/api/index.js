import axios from '../lib/ajaxRequest'

// 获取品牌
export const getBrand = params => axios.request({
  method: 'get',
  url: 'http://api.car.bitauto.com/CarInfo/masterbrandtoserialforsug.ashx',
  params
})

// 获取车系
export const getCarSeries = params => axios.request({
  method: 'get',
  url: 'http://api.car.bitauto.com/CarInfo/masterbrandtoserialforsug.ashx',
  params
})

// 获取车型
export const getCardModel = params => axios.request({
  method: 'get',
  url: 'http://mapi.yiche.com/web_app/api/v1/review/get_review_list',
  params
})

// 支付宝授权
export const authorization = params => axios.request({
  method: 'get',
  url: 'http://013a1500.ngrok.io/order/ws/authback',
  params
})
