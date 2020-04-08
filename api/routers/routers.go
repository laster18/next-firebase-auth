package routers

import (
	"api/db"
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

func postRouter(
	router *gin.RouterGroup,
	sqlhandler db.ISqlHandler,
	middlewareHandler middlewares.IHandler,
) {
	controller := v1.NewPostController(sqlhandler)

	router.GET("/posts", func(c *gin.Context) { controller.Index(c) })
	router.Use(middlewareHandler.Authentication(true))
	router.POST("/posts", func(c *gin.Context) { controller.Create(c) })
	router.Use(middlewareHandler.InjectPostById())
	router.PUT("/posts/:id", func(c *gin.Context) { controller.Update(c) })
	router.DELETE("/posts/:id", func(c *gin.Context) { controller.Delete(c) })
}

func postLikesRouter(
	router *gin.RouterGroup,
	sqlhandler db.ISqlHandler,
	middlewareHandler middlewares.IHandler,
) {
	controller := v1.NewLikeController(sqlhandler)

	router.Use(middlewareHandler.Authentication(true))
	router.Use(middlewareHandler.InjectPostById())
	router.POST("/posts/:id/like", func(c *gin.Context) { controller.Create(c) })
	router.DELETE("/posts/:id/like", func(c *gin.Context) { controller.Delete(c) })
}

func InitRouter(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")
	sqlhandler := db.NewSqlHandler()
	middlewareHandler := middlewares.New(sqlhandler)
	postRouter(apiV1, sqlhandler, middlewareHandler)
	postLikesRouter(apiV1, sqlhandler, middlewareHandler)
	// {
	// 	apiV1.GET("/hello", hello)
	// 	apiV1.GET("/private", middlewares.Authentication(true), GetPrivate)
	// 	apiV1.POST("/profile", middlewares.Authentication(false), PostProfile)
	// }
	// {
	// 	apiV1.POST("/users/profile", middlewares.Authentication(false), PostProfile)
	// }

	// // Group: `/api/v1/posts`
	// // posts := r.Group(fmt.Sprintf("%v/posts", prefix))
	// {
	// 	apiV1.GET("/posts", v1.GetPosts)
	// 	apiV1.POST("/posts", middlewares.Authentication(true), v1.CreatePost)
	// }

	// // Group: `/api/v1/posts/:id`
	// // postsById := r.Group(fmt.Sprintf("%v/posts/:id", prefix))
	// apiV1.Use(middlewares.Authentication(true))
	// apiV1.Use(middlewares.InjectPostById())
	// {
	// 	apiV1.DELETE("/posts/:id", v1.DeletePost)
	// 	apiV1.PUT("/posts/:id", v1.UpdatePost)
	// 	apiV1.POST("/posts/:id/like", v1.CreateLike)
	// 	apiV1.DELETE("/posts/:id/like", v1.DeleteLike)
	// }
}
