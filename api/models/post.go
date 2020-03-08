package models

import (
	"api/db"

	"github.com/jinzhu/gorm"
)

// Userはpointer型にしてomitemptyにすれば、Relatedで取得していない時にjson fieldには表示されない
// ようにしたかったけど、db.Db.Model(post).Related(&post.User)これでpanicになる
type Post struct {
	gorm.Model
	Title    string `json:"title"`
	ImageURL string `json:"imageUrl"`
	UserID   uint   `json:"-"`
	// User     *User `gorm:"foreignkey:UserID" json:",omitempty"`
}

func (p *Post) FetchPosts(limit int) []Post {
	var posts []Post
	db.Db.Order("created_at asc").Limit(limit).Find(&posts)
	return posts
}

func (post *Post) Create() (err error) {
	err = db.Db.Create(&post).Error
	return
}
