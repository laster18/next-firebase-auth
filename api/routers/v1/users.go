package v1

import (
	"api/db"
	"api/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IUserController interface {
	Update(c *gin.Context)
}

func NewUserController(sqlhandler db.ISqlHandler) IUserController {
	return &UserController{
		sqlhandler: sqlhandler,
	}
}

type UserController struct {
	sqlhandler db.ISqlHandler
}

type ProfileForm struct {
	DisplayName string `json:"displayName" binding:"required"`
}

func (uc *UserController) Update(c *gin.Context) {
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
