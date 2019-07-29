import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import echo from './store/echo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: false
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
          commit('running', false)
          console.error(err)
        })
    }
  },
  modules: {
    echo
  }
})
