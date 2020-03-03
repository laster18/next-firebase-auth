package models

import (
	"api/db"

	"github.com/jinzhu/gorm"
)

type Post struct {
	gorm.Model
	Title    string
	ImageURL string
	UserID   uint
}

func (p *Post) FetchPosts(limit int) []Post {
	var posts []Post
	db.Db.Order("created_at asc").Limit(limit).Find(&posts)
	return posts
}
