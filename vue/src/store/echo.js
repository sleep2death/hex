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
        switch (message.type_url) {
          case 'hex/pb.Echo':
            let echo = root.pb.Echo.decode(message.value)
            commit('updateList', echo.message)
            break
          case 'hex/pb.Error':
            let err = root.pb.Error.decode(message.value)
            commit('updateList', 'Error: ' + err.message)
            break
        }
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

let pb = root.pb
let Any = root.google.protobuf.Any

function parseCommand (message) {
  let parts = message.trim().split(' ')
  let filtered = parts.filter(el => {
    return el !== ''
  })

  let cmd = filtered[0]
  let args = filtered.slice(1)

  let msg = null
  let anyMsg = null

  switch (cmd) {
    // Echo From Server
    case 'echo':
      msg = pb.Echo.create({ message: args.join(' ') })
      anyMsg = Any.create({ type_url: 'hex/pb.Echo', value: root.pb.Echo.encode(msg).finish() })
      break
    // Login by name or create one by name
    case 'login':
      msg = pb.Login.create({ name: args[0] })
      anyMsg = Any.create({ type_url: 'hex/pb.Login', value: root.pb.Login.encode(msg).finish() })
      break
  }

  if (anyMsg) {
    return Any.encode(anyMsg).finish()
  }
}
