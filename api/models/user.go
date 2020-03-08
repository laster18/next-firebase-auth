package models

import (
	"api/db"
	"fmt"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	UID         string `json:"-"`
	DisplayName string `gorm:"default:'名無しさん'" json:"displayName"`
	Initialized bool   `gorm:"default:false" json:"-"`
	Post        []Post
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

func (u *User) SetInitialProfile(displayName string) {
	db.Db.Model(&u).Updates(map[string]interface{}{"DisplayName": displayName, "Initialized": true})
}
