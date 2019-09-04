import axios from '../lib/ajaxRequest'

export const getBrand = params => axios.request({
  method: 'get',
  url: 'http://api.car.bitauto.com/CarInfo/masterbrandtoserialforsug.ashx',
  params
})

export const getCarSeries = params => axios.request({
  method: 'get',
  url: 'http://api.car.bitauto.com/CarInfo/masterbrandtoserialforsug.ashx',
  params
})

export const getCardModel = params => axios.request({
  method: 'get',
  url: 'http://mapi.yiche.com/web_app/api/v1/review/get_review_list',
  params
})
