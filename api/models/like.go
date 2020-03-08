package models

import (
	"api/db"

	"github.com/jinzhu/gorm"
)

type Like struct {
	UserId int
	PostId int
}

func (l *Like) Create() (err error) {
	err = db.Db.Create(&l).Error
	return
}

func (l *Like) FetchByUserAndPostId() (err error) {
	err = db.Db.Where("user_id = ? AND post_id = ?", l.UserId, l.PostId).Find(&l).Error
	return
}

func (l *Like) Delete() (err error) {
	err = db.Db.Delete(&l).Error
	return
}

func (l *Like) AfterCreate(db *gorm.DB) (err error) {
	post := Post{Id: l.PostId}
	err = post.FetchById()
	db.Model(&post).Update("LikeCount", post.LikeCount+1)
	return
}

func (l *Like) AfterDelete(db *gorm.DB) (err error) {
	post := Post{Id: l.PostId}
	err = post.FetchById()
	db.Model(&post).Update("LikeCount", post.LikeCount-1)
	return
}
