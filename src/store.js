import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    model: {
      name: "",
      idCard: "",
      phoneNumber: "",
      vehicleModel: "",
      agree: false
    },
    authData: {
      authCode: '',
      state: '',
      token: ''
    },
    user: {
      customerId: '',
      aliPayUserId: '',
      alipayVersion: ''
    }
  },
  mutations: {
    // SET_AUTH_CODE (state, authCode) {
    //   state.authCode = authCode
    // }
  },
  actions: {
    // setAuthCode ({commit}, authCode) {
    //   commit('SET_AUTH_CODE', authCode)
    // }
  }
})
