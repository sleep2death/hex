# TODO List

## 脚手架
- [x] 搭建websocket服务器
- [x] 搭建vue app
- [x] 前后端测试 

- [x] ping/pong 连接超时检测
- [x] protobuf
- [ ] 用户登陆 和 mongdb, oauth, session
- [ ] 用户数据结构设计
- [ ] 英雄数据结构设计

`pbjs -t static-module -w es6 -o ./vue/src/pb/command.pb.js ./pb/command.proto -l eslint-disable`

`protoc --go_out=. ./pb/command.proto`