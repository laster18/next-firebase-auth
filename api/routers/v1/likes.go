package v1

import (
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateLike(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	post := c.MustGet("post").(models.Post)
	like := models.Like{
		UserId: user.Id,
		PostId: post.Id,
	}
	if err := like.Create(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed like",
		})
		return
	}

	c.Status(http.StatusCreated)
}

func DeleteLike(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	post := c.MustGet("post").(models.Post)
	like := models.Like{
		UserId: user.Id,
		PostId: post.Id,
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
