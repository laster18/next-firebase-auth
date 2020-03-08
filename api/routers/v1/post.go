package v1

import (
	"api/models"
	"api/services/imageUploader"
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetPosts(c *gin.Context) {
	var post models.Post

	posts := post.FetchPosts(10)
	fmt.Println("posts: ", posts)

	c.JSON(http.StatusOK, gin.H{
		"message": "ok",
	})
}

type CreateForm struct {
	Title string                `form:"title" binding:"required"`
	Image *multipart.FileHeader `form:"image" binding:"required"`
}

func CreatePost(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	var form CreateForm
	if err := c.ShouldBind(&form); err != nil {
		fmt.Println("bind error: ", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	uploader := imageUploader.New("development")
	uploadedIamgeUrl, err := uploader.Save(form.Image)
	if err != nil {
		fmt.Println("image uplaod err: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "create post error",
		})
		return
	}

	post := models.Post{
		Title:    form.Title,
		ImageURL: uploadedIamgeUrl,
		UserID:   user.ID,
	}

	if err := post.Create(); err != nil {
		fmt.Println("create post error: ", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"post": post,
	})
}
