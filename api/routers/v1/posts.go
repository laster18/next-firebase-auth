package v1

import (
	"api/db"
	"api/models"
	"api/services/imageUploader"
	"fmt"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostController struct {
	SqlHandler db.ISqlHandler
}

func NewPostController(sqlhandler db.ISqlHandler) *PostController {
	return &PostController{
		SqlHandler: sqlhandler,
	}
}

func (pc *PostController) Index(c *gin.Context) {
	post := models.Post{Db: pc.SqlHandler}
	posts := post.FetchPosts(10)

	c.JSON(http.StatusOK, posts)
}

type CreateForm struct {
	Title string                `form:"title" binding:"required"`
	Image *multipart.FileHeader `form:"image" binding:"required"`
}

func (pc *PostController) Create(c *gin.Context) {
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
		ImageUrl: uploadedIamgeUrl,
		UserId:   user.Id,
		Db:       pc.SqlHandler,
	}

	if err := post.Create(); err != nil {
		fmt.Println("create post error: ", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	post.User = user

	c.JSON(http.StatusCreated, post)
}

type UpdatePostForm struct {
	Title string `json:"title" binding:"required"`
}

func (pc *PostController) Update(c *gin.Context) {
	post := c.MustGet("post").(models.Post)

	var form UpdatePostForm
	if err := c.ShouldBind(&form); err != nil {
		fmt.Println("bind error: ", err.Error())
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	post.Title = form.Title
	if err := post.Save(); err != nil {
		fmt.Println("update error: ", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Unexpected Error",
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "updated.",
	})
}

func (pc *PostController) Delete(c *gin.Context) {
	post := c.MustGet("post").(models.Post)

	err := post.Delete()
	if err != nil {
		fmt.Println("delete err: ", err)
	}

	c.Status(http.StatusNoContent)
}
