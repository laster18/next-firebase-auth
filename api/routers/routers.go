package routers

import (
	"api/db"
	"api/middlewares"
	v1 "api/routers/v1"

	"github.com/gin-gonic/gin"
)

func sampleRouter(
	router *gin.RouterGroup,
	sqlhandler db.ISqlHandler,
	middlewareHandler middlewares.IHandler,
) {
	controller := v1.NewSampleController(sqlhandler)

	router.GET("/hello", func(c *gin.Context) { controller.Hello(c) })
	router.GET("/private", middlewareHandler.Authentication(true), func(c *gin.Context) { controller.Hello(c) })
}

func userRouter(
	router *gin.RouterGroup,
	sqlhandler db.ISqlHandler,
	middlewareHandler middlewares.IHandler,
) {
	controller := v1.NewUserController(sqlhandler)

	router.Use(middlewareHandler.Authentication(false))
	router.PUT("/profile", func(c *gin.Context) { controller.Update(c) })
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

func Dispatch(r *gin.Engine) {
	apiV1 := r.Group("/api/v1")
	sqlhandler := db.NewSqlHandler()
	middlewareHandler := middlewares.New(sqlhandler)

	/* Dispatch routers */
	sampleRouter(apiV1, sqlhandler, middlewareHandler)
	userRouter(apiV1, sqlhandler, middlewareHandler)
	postRouter(apiV1, sqlhandler, middlewareHandler)
	postLikesRouter(apiV1, sqlhandler, middlewareHandler)
}
