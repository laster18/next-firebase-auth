package models

import "api/db"

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
