import root from '@/pb/command.pb'

let pb = root.pb
let Any = root.google.protobuf.Any

var encode = function (cmd, args) {
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
      msg = pb.LoginReq.create({ name: args[0] })
      anyMsg = Any.create({ type_url: 'hex/pb.LoginReq', value: root.pb.LoginReq.encode(msg).finish() })
      break
  }

  if (anyMsg) {
    return Any.encode(anyMsg).finish()
  }
}

var decode = function (any, commit) {
  switch (any.type_url) {
    case 'hex/pb.Echo':
      let echo = root.pb.Echo.decode(any.value)
      commit('updateList', echo.message)
      break
    case 'hex/pb.Error':
      let err = root.pb.Error.decode(any.value)
      commit('updateList', 'Error: ' + err.message)
      break
    case 'hex/pb.LoginResp':
      let res = root.pb.LoginResp.decode(any.value)
      console.log(res)
      break
  }
}

export { encode, decode }
