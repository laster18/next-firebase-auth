package models

import (
	"api/db"
	"fmt"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	UID         string
	DisplayName string `gorm:"default:'名無しさん'"`
	Initialized bool   `gorm:"default:false"`
}

func (u *User) CheckInitialized(uid string) (bool, error) {
	return true, nil
}

func (u *User) Fetch(uid string) error {
	if err := db.Db.Where("uid = ?", uid).First(u).Error; err != nil {
		fmt.Println("err: ", err)
		return err
	}
	return nil
}

func (u *User) FindOrCreate(uid string) {
	db.Db.Where(User{UID: uid}).FirstOrCreate(&u)
}
