package v1

import (
	"api/db"
	"api/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ISampleController interface {
	Hello(*gin.Context)
	PrivateMessage(*gin.Context)
}

func NewSampleController(sqlhandler db.ISqlHandler) ISampleController {
	return &SampleController{
		sqlhandler: sqlhandler,
	}
}

type SampleController struct {
	sqlhandler db.ISqlHandler
}

func (sc *SampleController) Hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hogehoge",
	})
}

func (sc *SampleController) PrivateMessage(c *gin.Context) {
	user := c.MustGet("user").(models.User)
	fmt.Println("In GetPrivate user: ", user)

	c.JSON(http.StatusOK, gin.H{
		"message": "private message",
	})
}
