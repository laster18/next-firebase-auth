package db

import "github.com/jinzhu/gorm"

type ISqlHandler interface {
	Order(interface{}, ...bool) *gorm.DB
	Preload(string, ...interface{}) *gorm.DB
	First(interface{}, ...interface{}) *gorm.DB
	Delete(interface{}, ...interface{}) *gorm.DB
	Save(interface{}) *gorm.DB
	Create(interface{}) *gorm.DB
	Where(interface{}, ...interface{}) *gorm.DB
	Model(interface{}) *gorm.DB
}
