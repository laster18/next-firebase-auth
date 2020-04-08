package middlewares

import (
	"api/db"

	"github.com/gin-gonic/gin"
)

type IHandler interface {
	Authentication(bool) gin.HandlerFunc
	InjectPostById() gin.HandlerFunc
}

type Handler struct {
	Db db.ISqlHandler
}

func (h *Handler) Authentication(enableInitialiedCheck bool) gin.HandlerFunc {
	return Authentication(enableInitialiedCheck, h.Db)
}

func (h *Handler) InjectPostById() gin.HandlerFunc {
	return InjectPostById(h.Db)
}

func New(sqlhandler db.ISqlHandler) IHandler {
	return &Handler{
		Db: sqlhandler,
	}
}
