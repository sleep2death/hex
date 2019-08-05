import root from '@/pb/command.pb'
import { encode, decode } from './handlers'

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
      state.list.push({ message: 'CONNECTED', id: state.list.length })
    },
    close (state) {
      state.conn = null
      state.list.push({ message: 'CLOSED', id: state.list.length })
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
        decode(message, commit)
      }
      conn.onclose = function (evt) {
        commit('close', conn)
      }
    },
    send ({ commit, state }) {
      if (state.conn != null) {
        let res = parseCommand(state.message)

        if (res != null) {
          state.conn.send(res)
        } else {
          commit('updateList', 'command invalide')
        }
      }
      commit('clearMessage')
    }
  }
}

function parseCommand (message) {
  let parts = message.trim().split(' ')
  let filtered = parts.filter(el => {
    return el !== ''
  })

  let cmd = filtered[0]
  let args = filtered.slice(1)

  return encode(cmd, args)
}
