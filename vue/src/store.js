import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import command from './store/command'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: 'No'
  },
  mutations: {
    running (state, payload) {
      state.running = payload
    }
  },
  actions: {
    isServerRunning ({ commit }) {
      axios.get('http://localhost:9090/api/running')
        .then(function (resp) {
          return resp.data
        }).then(function (data) {
          commit('running', data)
        }).catch(function (err) {
          commit('running', 'No')
          console.error(err)
        })
    }
  },
  modules: {
    command
  }
})
