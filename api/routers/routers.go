package routers

import (
	"net/http"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hogehoge",
	})
}

const JwtKey = "hogemiso"

func GetToken(c *gin.Context) {
	// headerのセット
	token := jwt.New(jwt.SigningMethodHS256)

	// claimsのセット
	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["sub"] = "54546557354"
	claims["name"] = "taro"
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// 電子署名
	// tokenString, _ := token.SignedString([]byte(os.Getenv("SIGNINGKEY")))
	tokenString, _ := token.SignedString([]byte(JwtKey))

	// JWTを返却
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
	})
}

// JwtMiddleware check token
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(JwtKey), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})

func checkJWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		jwtMid := *JwtMiddleware
		if err := jwtMid.CheckJWT(c.Writer, c.Request); err != nil {
			c.AbortWithStatus(401)
		}
	}
}

func GetPrivate(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "private message",
	})
}

func InitRouter(r *gin.Engine) {
	prefixV1 := r.Group("/api/v1")

	{
		// sample API
		prefixV1.GET("/hello", hello)
		prefixV1.GET("/login", GetToken)
		prefixV1.GET("/private", checkJWT(), GetPrivate)
	}
}
