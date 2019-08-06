package hex

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/joho/godotenv"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func TestServe(t *testing.T) {
	go Serve(":9090")

	resp, err := http.Get("http://localhost:9090/api/running")

	if err != nil {
		t.Error(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		t.Error(err)
	}

	if resp.StatusCode != http.StatusOK {
		t.Error("Response status code not OK:", resp.StatusCode)
	}

	assert.Equal(t, "Yes", string(body))
}

type result struct {
	Name  string      `bson:"name"`
	Value interface{} `bson:"value"`
}

func TestMongoConnect(t *testing.T) {
	// load env file
	err := godotenv.Load("./.env")

	if err != nil {
		t.Error(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	uri := fmt.Sprintf(`mongodb://%s`, os.Getenv("MONGO_SERVER"))

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		t.Errorf("Can not connect to mongo: %v", err)
	}

	// test ping to db
	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		t.Errorf("Can not connect to db: %v", err)
	} else {
		t.Log("Connected to mongo.")
	}

	// coll := client.Database("test").Collection("indexText")

	if err = client.Database("test").Collection("test").Drop(ctx); err != nil {
		t.Error(err)
	}

	coll := client.Database("test").Collection("test")

	docs := []interface{}{
		&result{Name: "pi", Value: 3.14159},
		&result{Name: "int", Value: 5},
		&result{Name: "string", Value: "Hello"},
	}

	if _, err = coll.InsertMany(ctx, docs); err != nil {
		t.Error(err)
	}

	cur, err := coll.Find(ctx, bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(ctx)

	for cur.Next(ctx) {
		res := &bson.M{}
		err := cur.Decode(res)
		if err != nil {
			t.Error(err)
		}
		t.Log(res)
	}

	if err := cur.Err(); err != nil {
		t.Error(err)
	}

	db := &DataBase{DB: client.Database("test")}
	if err = db.EnsureIndex("test", "name"); err != nil {
		t.Error(err)
	}

	if cur, err = coll.Indexes().List(ctx); err != nil {
		t.Error(err)
	}

	for cur.Next(ctx) {
		// doc := cur.Current.Lookup("name")
		t.Log(cur.Current.Lookup("name"))
	}
}
