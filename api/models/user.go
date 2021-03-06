package models

import (
	"api/db"
	"fmt"
	"time"
)

type User struct {
	Id          int       `json:"id"`
	FirebaseUid string    `json:"-"`
	DisplayName string    `json:"displayName"`
	IconUrl     string    `json:"iconUrl"`
	ProfileText string    `json:"profileText"`
	Initialized bool      `json:"-"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
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
	db.Db.Where(User{FirebaseUid: uid}).FirstOrCreate(&u)
}

func (u *User) SetInitialProfile(displayName string) {
	db.Db.Model(&u).Updates(map[string]interface{}{"DisplayName": displayName, "Initialized": true})
}
