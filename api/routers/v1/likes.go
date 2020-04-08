package v1

import (
	"api/db"
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ILikeController interface {
	Create(c *gin.Context)
	Delete(c *gin.Context)
}

type LikeController struct {
	sqlhandler db.ISqlHandler
}

func NewLikeController(sqlhandler db.ISqlHandler) ILikeController {
	return &LikeController{
		sqlhandler: sqlhandler,
	}
}

func (lc *LikeController) Create(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	post := c.MustGet("post").(models.Post)
	like := models.Like{
		UserId: user.Id,
		PostId: post.Id,
		Db:     lc.sqlhandler,
	}
	if err := like.Create(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed like",
		})
		return
	}

	c.Status(http.StatusCreated)
}

func (lc *LikeController) Delete(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	post := c.MustGet("post").(models.Post)
	like := models.Like{
		UserId: user.Id,
		PostId: post.Id,
		Db:     lc.sqlhandler,
	}
	if err := like.FetchByUserAndPostId(); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Not exits like",
		})
		return
	}
	if err := like.Delete(); err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"message": "Failed delete like",
		})
		return
	}

	c.Status(http.StatusNoContent)
}
