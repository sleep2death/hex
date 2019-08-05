package hex

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// CName are collection name's shorthand
type CName int

const (
	// USERS user collection
	USERS CName = iota
)

func (c CName) String() string {
	return [...]string{"users"}[c]
}

// DataBase is the struct to hold the mongodb instance and infos
type DataBase struct {
	DB      *mongo.Database
	Context context.Context
}

// User struct to hold user data
type User struct {
	ID         string             `bson:"openid"`
	Session    string             `bson:"session"`
	CreateTime primitive.DateTime `bson:"create"`
}

// EnsureIndex is an util function to ensure index of a certain collection
func (db *DataBase) EnsureIndex(cName string, iName string) error {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
	defer cancel()

	cur, err := db.DB.Collection(cName).Indexes().List(ctx)
	if err != nil {
		return err
	}

	found := false

	name := iName + "_"

	for cur.Next(ctx) {
		doc := cur.Current.Lookup("name")
		if doc.StringValue() == name {
			found = true
			break
		}
	}

	idxOpts := options.Index()
	idxOpts.SetUnique(true)
	idxOpts.SetName(name)

	idx := mongo.IndexModel{
		Keys:    bson.D{bson.E{Key: iName, Value: 1}},
		Options: idxOpts,
	}
	if !found {
		str, err := db.DB.Collection(cName).Indexes().CreateOne(ctx, idx)
		if err != nil {
			return err
		}
		log.Printf("Making index: %s of collection: %s", str, cName)
	} else {
		log.Printf("Already has index: %s", name)
	}
	return nil
}
