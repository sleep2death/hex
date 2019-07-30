package hex

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	cors "github.com/rs/cors/wrapper/gin"
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
	r.GET("/ws", ws)

	r.Run(addr)
}

func ws(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)

	if err != nil {
		log.Println("upgrade:", err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "websocket upgrade failed"})
		return
	}

	defer conn.Close()

	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = conn.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
