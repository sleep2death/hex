import root from '@/pb/command.pb'
// const protobuf = require('protobufjs') // requires the full library
// const descriptor = require('protobufjs/ext/descriptor')
// const descriptor = require('protobufjs/ext/descriptor')

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
      conn.binaryType = 'arraybuffer'

      conn.onopen = function (evt) {
        commit('connect', conn)
        console.log('websocket connected')
      }
      conn.onmessage = function (evt) {
        // let message = pb.Echo.decode(new Uint8Array(evt.data))
        // commit('updateList', message.message)
      }
      conn.onclose = function (evt) {
        commit('close', conn)
      }
    },
    send ({ commit, state }) {
      // let echoMsg = root.pb.Echo.create({ message: state.message })
      // let echo = root.google.protobuf.Any.create({ type_url: 'Echo', value: root.pb.Echo.encode(echoMsg).finish() })

      // let msg = root.pb.Message.create({ message: echo })
      // let buffer = root.pb.Message.encode(msg).finish()

      // msg = root.pb.Message.decode(buffer)
      // echoMsg = root.pb[msg.message.type_url].decode(msg.message.value)
      // console.log(echoMsg)

      if (state.conn != null) {
        let echoMsg = root.pb.Echo.create({ message: state.message })
        let echo = root.google.protobuf.Any.create({ type_url: 'Echo', value: root.pb.Echo.encode(echoMsg).finish() })

        let msg = root.pb.Message.create({ message: echo })
        let buffer = root.pb.Message.encode(msg).finish()
        // let message = pb.Echo.create({ message: state.message })
        // let buffer = pb.Echo.encode(message).finish()
        // let message = pb.Message.create({ message: state.message })
        // let buffer = pb.Message.encode(message).finish()
        // console.log(pb.Message.decode(buffer))

        state.conn.send(buffer)
      }
      commit('clearMessage')
    }
  }
}
