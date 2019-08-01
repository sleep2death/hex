import root from '@/pb/command.pb'

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
      state.list.push({ message: 'Connection CLOSED.', id: state.list.length })
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
      conn.binaryType = 'arraybuffer'

      conn.onopen = function (evt) {
        commit('connect', conn)
        console.log('websocket connected')
      }
      conn.onmessage = function (evt) {
        let message = root.google.protobuf.Any.decode(new Uint8Array(evt.data))
        switch (message.type_url) {
          case 'hex/pb.Echo':
            let echo = root.pb.Echo.decode(message.value)
            commit('updateList', echo.message)
            break
        }
      }
      conn.onclose = function (evt) {
        commit('close', conn)
      }
    },
    send ({ commit, state }) {
      if (state.conn != null) {
        let echoMsg = root.pb.Echo.create({ message: state.message })
        let anyMsg = root.google.protobuf.Any.create({ type_url: 'hex/pb.Echo', value: root.pb.Echo.encode(echoMsg).finish() })
        let buf = root.google.protobuf.Any.encode(anyMsg).finish()
        // let msg = root.pb.Message.create({ message: anyMsg })

        // let buffer = root.pb.Message.encode(msg).finish()
        state.conn.send(buf)
      }
      commit('clearMessage')
    }
  }
}
