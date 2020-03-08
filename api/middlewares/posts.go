package middlewares

import (
	"api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InjectPostById() gin.HandlerFunc {
	return func(c *gin.Context) {
		/* fetch post record */
		postId, _ := strconv.Atoi(c.Param("id"))
		post := models.Post{Id: postId}
		if err := post.FetchById(); err != nil {
			c.JSON(http.StatusNotFound, gin.H{
				"messgage": "Post is not found",
			})
			c.Abort()
			return
		}

		/* post record authority check */
		user := c.MustGet("user").(models.User)
		if post.Id != user.Id {
			c.JSON(http.StatusForbidden, gin.H{
				"messagse": "Forbidden",
			})
			return
		}

		c.Set("post", post)
	}
}
