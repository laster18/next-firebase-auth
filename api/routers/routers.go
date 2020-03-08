package routers

import (
	"api/middlewares"
	"api/models"
	v1 "api/routers/v1"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hogehoge",
	})
}

func GetPrivate(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	fmt.Println("In GetPrivate user: ", user)

	c.JSON(http.StatusOK, gin.H{
		"message": "private message",
	})
}

type ProfileForm struct {
	DisplayName string `json:"displayName" binding:"required"`
}

func PostProfile(c *gin.Context) {
	var form ProfileForm
	if err := c.Bind(&form); err != nil {
		fmt.Println("form bind error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
	}

	user := c.MustGet("user").(models.User)
	user.SetInitialProfile(form.DisplayName)
	c.JSON(http.StatusOK, user)
}

func InitRouter(r *gin.Engine) {
	prefix := "/api/v1"
	prefixV1 := r.Group(prefix)
	{
		prefixV1.GET("/hello", hello)
		prefixV1.GET("/private", middlewares.Authentication(true), GetPrivate)
		prefixV1.POST("/profile", middlewares.Authentication(false), PostProfile)
	}
	{
		prefixV1.POST("/users/profile", middlewares.Authentication(false), PostProfile)
	}

	// Group: `/api/v1/posts`
	posts := r.Group(fmt.Sprintf("%v/posts", prefix))
	{
		posts.GET("/", v1.GetPosts)
		posts.POST("/", middlewares.Authentication(true), v1.CreatePost)
	}

	// Group: `/api/v1/posts/:id`
	postsById := r.Group(fmt.Sprintf("%v/posts/:id", prefix))
	postsById.Use(middlewares.Authentication(true))
	postsById.Use(middlewares.InjectPostById())
	{
		postsById.DELETE("/", v1.DeletePost)
		postsById.PUT("/", v1.UpdatePost)
		postsById.POST("/like", v1.CreateLike)
		postsById.DELETE("/like", v1.DeleteLike)
	}
}
