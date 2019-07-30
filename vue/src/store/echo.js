import moment from 'moment'

export default {
  state: {
    message: '',
    conn: null
  },
  mutations: {
    updateMessage (state, payload) {
      state.message = payload
    },
    connect (state, payload) {
      state.conn = payload
    },
    close (state) {
      state.conn = null
    }
  },
  actions: {
    connect ({ commit }) {
      const conn = new WebSocket('ws://localhost:9090/ws')
      conn.onopen = function (evt) {
        commit('connect', conn)
        console.log('websocket connected')
      }
      conn.onmessage = function (evt) {
        console.log('receive:', evt.data)
      }
      conn.onclose = function (evt) {
        commit('close', conn)
      }
    },
    send ({ commit, state }) {
      if (state.conn != null) {
        state.conn.send(state.message + ' - ' + moment().format('MMMM Do YYYY, h:mm:ss a'))
      }
    }
  }
}
