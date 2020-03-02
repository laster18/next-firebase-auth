package routers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
)

func hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "hogehoge",
	})
}

func GetPrivate(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "private message",
	})
}

func Authenticate(c *gin.Context) {
	// Firebase SDK のセットアップ
	ctx := context.Background()
	credentials, err := google.CredentialsFromJSON(ctx, []byte(os.Getenv("FIREBASE_KEYFILE_JSON")))
	if err != nil {
		log.Printf("error credentials from json: %v\n", err)
	}

	opt := option.WithCredentials(credentials)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Printf("error initializing app: %v\n", err)
	}
	auth, err := app.Auth(context.Background())

	// Headerからtokenを取り出す
	authHeader := c.GetHeader("Authorization")
	fmt.Println("authHeader: ", authHeader)
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	fmt.Println("idToken: ", idToken)

	// JWTの検証
	token, err := auth.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		fmt.Printf("error verifying ID token: %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "error verifying ID token",
		})
		c.Abort()
		return
	}
	// fmt.Printf("Verified ID token: %v\n", token)
	fmt.Printf("UID: %v\n", token.UID)
}

func InitRouter(r *gin.Engine) {
	prefixV1 := r.Group("/api/v1")

	{
		// sample API
		prefixV1.GET("/hello", hello)
		prefixV1.GET("/private", Authenticate, GetPrivate)
		// prefixV1.GET("/login", GetToken)
		// prefixV1.GET("/private", checkJWT(), GetPrivate)
	}
}
