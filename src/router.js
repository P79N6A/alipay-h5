import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        // 页面标题title
        title: '申请评估'
      }
    },
    {
      path: '/brand',
      name: 'brand',
      component: () => import(/* webpackChunkName: "brand" */ './views/brand.vue'),
      meta:{
        title: '选择品牌'
      }
    },
    {
      path: '/carSeries',
      name: 'carSeries',
      component: () => import(/* webpackChunkName: "carSeries" */ './views/carSeries.vue'),
      meta:{
        title: '选择车系'
      }
    },
    {
      path: '/carModel',
      name: 'carModel',
      component: () => import(/* webpackChunkName: "carModel" */ './views/carModel.vue'),
      meta:{
        title: '选择车型'
      }
    },
    {
      path: '/evaluationAgreement',
      name: 'evaluationAgreement',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/evaluationAgreement.vue'),
      meta:{
        title: '申请评估协议'
      }
    }
  ]
})
