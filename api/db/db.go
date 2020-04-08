package db

import (
	"api/config"
	"fmt"

	"github.com/jinzhu/gorm"
)

func NewSqlHandler() ISqlHandler {
	db, err := gormConnect()
	if err != nil {
		panic(err)
	}

	db.LogMode(true)
	return &SqlHandler{
		Conn: db,
	}
}

type SqlHandler struct {
	Conn *gorm.DB
}

func (sh *SqlHandler) Order(value interface{}, reorder ...bool) *gorm.DB {
	return sh.Conn.Order(value, reorder...)
}

func (sh *SqlHandler) Preload(column string, conditions ...interface{}) *gorm.DB {
	return sh.Conn.Preload(column, conditions...)
}

func (sh *SqlHandler) First(out interface{}, where ...interface{}) *gorm.DB {
	return sh.Conn.First(out, where...)
}

func (sh *SqlHandler) Delete(value interface{}, where ...interface{}) *gorm.DB {
	return sh.Conn.Delete(value, where...)
}

func (sh *SqlHandler) Save(value interface{}) *gorm.DB {
	return sh.Conn.Save(value)
}

func (sh *SqlHandler) Create(value interface{}) *gorm.DB {
	return sh.Conn.Create(value)
}

func (sh *SqlHandler) Where(query interface{}, args ...interface{}) *gorm.DB {
	return sh.Conn.Where(query, args...)
}

func (sh *SqlHandler) Model(value interface{}) *gorm.DB {
	return sh.Conn.Model(value)
}

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
