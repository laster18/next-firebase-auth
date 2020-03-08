package models

import (
	"api/db"
	"time"
)

// Userはpointer型にしてomitemptyにすれば、Relatedで取得していない時にjson fieldには表示されない
// ようにしたかったけど、db.Db.Model(post).Related(&post.User)これでpanicになる
type Post struct {
	Id        int       `json:"id"`
	Title     string    `json:"title"`
	ImageUrl  string    `json:"imageUrl"`
	LikeCount int       `json:"likeCount"`
	UserId    int       `json:"userId"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
	User      User      `json:"user"`
}

func (p *Post) FetchPosts(limit int) []*Post {
	var posts []*Post
	db.Db.Order("created_at asc").Limit(limit).Find(&posts)
	db.Db.Preload("User").Find(&posts)
	return posts
}

func (p *Post) FetchById() (err error) {
	err = db.Db.First(&p, p.Id).Error
	return
}

func (p *Post) Delete() (err error) {
	err = db.Db.Delete(&p).Error
	return
}

func (p *Post) Save() (err error) {
	err = db.Db.Save(&p).Error
	return
}

func (post *Post) Create() (err error) {
	err = db.Db.Create(&post).Error
	return
}
