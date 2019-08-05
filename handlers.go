package hex

import (
	"errors"
	"log"
	"strings"
	"time"

	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes"
	"github.com/sleep2death/hex/pb"
)

var errHandlerNotFound = errors.New("handler not found")
var errInputNotValid = errors.New("input not valid")

var handlers = map[string]func(data []byte) (buf []byte, err error){
	"hex/pb.Echo":     echoHandler,
	"hex/pb.LoginReq": loginHandler,
}

func handle(name string, data []byte) (buf []byte, err error) {
	if f := handlers[name]; f != nil {
		buf, err = f(data)
		return
	}
	return nil, errHandlerNotFound
}

func echoHandler(data []byte) (buf []byte, err error) {
	echo := &pb.Echo{}

	// decode raw data (any message data) to login message
	if err = proto.Unmarshal(data, echo); err != nil {
		log.Println("unmashal echo message error:", err)
		err = errUnMashal
		return
	}

	echo.Message = echo.GetMessage() + " [echo from server -- " + time.Now().Format("3:04PM") + "]"
	any, err := ptypes.MarshalAny(echo)

	if err != nil {
		log.Println("marshal echo mesage error:", err)
		err = errMashal
		return
	}
	any.TypeUrl = "hex/pb.Echo"
	buf, err = proto.Marshal(any)

	if err != nil {
		log.Println("marshal echo message error:", err)
		err = errMashal
		return
	}

	return
}

func loginHandler(data []byte) (buf []byte, err error) {
	login := &pb.LoginReq{}

	// decode raw data (any message data) to login message
	if err = proto.Unmarshal(data, login); err != nil {
		log.Println("unmashal login message error:", err)
		err = errUnMashal
		return
	}

	// trim & validate username
	name := strings.Trim(login.GetName(), " ")

	if len(name) == 0 {
		log.Println("username can not be empty")
		err = errInputNotValid
		return
	}

	user := &pb.User{Name: name}
	resp := &pb.LoginResp{User: user}

	any, err := ptypes.MarshalAny(resp)
	if err != nil {
		log.Println("marshal login resp mesage error:", err)
		err = errMashal
		return
	}
	any.TypeUrl = "hex/pb.LoginResp"
	buf, err = proto.Marshal(any)

	if err != nil {
		log.Println("marshal login resp message error:", err)
		err = errMashal
		return
	}

	return
}
