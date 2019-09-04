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
    }
  },
  mutations: {
    SET_MODEL_NAME (state, modelName) {
      state.modelName = modelName
    }
  },
  actions: {
    setModelName ({commit}, modleName) {
      commit('SET_MODEL_NAME', modleName)
    }
  }
})
