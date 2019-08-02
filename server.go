package hex

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang/protobuf/proto"
	"github.com/golang/protobuf/ptypes"
	"github.com/golang/protobuf/ptypes/any"
	"github.com/gorilla/websocket"
	cors "github.com/rs/cors/wrapper/gin"
	"github.com/sleep2death/hex/pb"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 30 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 30 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	}}

// Serve the http requests
func Serve(addr string) {
	// create the router
	r := gin.Default()

	// ignore cors limit
	r.Use(cors.Default())

	// serve static files
	// TODO: make all static files severing by nginx, OR NOT?
	// r.Use(static.Serve("/", static.LocalFile("./vue/dist", true)))

	// just a handler for testing, if the server is running, it will return "Yes"
	r.GET("/api/running", func(c *gin.Context) {
		c.String(200, "Yes")
	})

	// handle websocket connection
	r.GET("/ws", getWsHandler())

	r.Run(addr)
}

type conn struct {
	// The websocket connection.
	ws *websocket.Conn
	// Buffered channel of outbound messages.
	send chan []byte
}

func (c *conn) readPump() {
	defer func() {
		c.ws.Close()
	}()

	c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error {
		c.ws.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	// proto.RegisterType((*pb.Echo)(nil), "Echo")

readLoop:
	for {
		mt, message, err := c.ws.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break readLoop
		}

		// test echo
		if mt == websocket.TextMessage {
			c.send <- message
		} else if mt == websocket.BinaryMessage {
			anyMsg := &any.Any{}
			proto.Unmarshal(message, anyMsg)
			// anyMsg := msg.GetMessage()

			switch anyMsg.GetTypeUrl() {
			case "hex/pb.Echo":
				echo := &pb.Echo{}
				if err = ptypes.UnmarshalAny(anyMsg, echo); err != nil {
					log.Println("unmashal error:", err)
					break
				}

				echo.Message = echo.GetMessage() + " [echo from server -- " + time.Now().Format("3:04PM") + "]"
				any, err := ptypes.MarshalAny(echo)
				if err != nil {
					log.Println("marshal error:", err)
					break
				}
				any.TypeUrl = "hex/pb.Echo"
				buf, err := proto.Marshal(any)
				if err != nil {
					log.Println("marshal error:", err)
					break
				}
				c.send <- buf
			default:
				// err = errors.New("Can't determine message type:" + anyMsg.GetTypeUrl())
				errMsg := &pb.Error{Message: "Command not found: " + anyMsg.GetTypeUrl()}
				any, err := ptypes.MarshalAny(errMsg)

				if err != nil {
					log.Println("marshal error:", err)
					break
				}
				any.TypeUrl = "hex/pb.Error"
				buf, err := proto.Marshal(any)
				c.send <- buf
			}
			// c.send <- []byte(echo.Message)
		}
	}
}

// write writes a message with the given message type and payload.
func (c *conn) write(mt int, payload []byte) error {
	c.ws.SetWriteDeadline(time.Now().Add(writeWait))
	return c.ws.WriteMessage(mt, payload)
}

func (c *conn) writePump() {
	// ping ticker
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				// The hub closed the channel.
				c.write(websocket.CloseMessage, []byte{})
				return
			}

			c.ws.SetWriteDeadline(time.Now().Add(writeWait))
			w, err := c.ws.NextWriter(websocket.BinaryMessage)
			if err != nil {
				return
			}

			w.Write(message)

			// c.ws.WriteMessage(websocket.BinaryMessage, buffer)

			// Add queued chat messages to the current websocket message.
			// n := len(c.send)
			// for i := 0; i < n; i++ {
			// 	w.Write(newline)
			// 	w.Write(<-c.send)
			// }

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func getWsHandler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ws, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)

		if err != nil {
			log.Println("upgrade:", err)
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "websocket upgrade failed"})
			return
		}

		wsc := conn{ws: ws, send: make(chan []byte, 256)}
		go wsc.writePump()
		wsc.readPump()
	}
}
