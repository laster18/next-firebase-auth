package v1

import (
	"api/models"
	"fmt"
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
