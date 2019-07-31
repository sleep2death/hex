export default {
  state: {
    message: '',
    conn: null,
    list: []
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
    },
    updateList (state, payload) {
      state.list.push({ message: payload, id: state.list.length })
    },
    clearMessage (state) {
      state.message = ''
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
        commit('updateList', evt.data)
      }
      conn.onclose = function (evt) {
        commit('close', conn)
      }
    },
    send ({ commit, state }) {
      if (state.conn != null) {
        state.conn.send(state.message)
      }
      commit('clearMessage')
    }
  }
}
