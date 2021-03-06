package db

import (
	"api/config"
	"fmt"
	"github.com/jinzhu/gorm"
)

var Db *gorm.DB

func getConnectString() string {
	USER := config.Db.User
	PASSWORD := config.Db.Password
	PROTOCOL := fmt.Sprintf("tcp(db:%s)", config.Db.Port)
	DBNAME := config.Db.Name
	QUERY := "?charset=utf8mb4&parseTime=True&loc=Local"
	CONNECT := USER + ":" + PASSWORD + "@" + PROTOCOL + "/" + DBNAME + QUERY

	return CONNECT
}

func gormConnect() (*gorm.DB, error) {
	DRIVER := config.Db.Driver
	CONNECT := getConnectString()
	db, err := gorm.Open(DRIVER, CONNECT)
	return db, err
}

func Setup() {
	var err error
	Db, err = gormConnect()
	if err != nil {
		fmt.Println("failed to connect database err: ", err)
	}

	// debug
	Db.LogMode(true)
}

func Close() {
	Db.Close()
}
