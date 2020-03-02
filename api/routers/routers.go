package routers

import (
	"api/models"
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
	user := c.MustGet("user").(models.User)
	fmt.Println("In GetPrivate user: ", user)

	c.JSON(http.StatusOK, gin.H{
		"message": "private message",
	})
}

type ProfileForm struct {
	DisplayName string `json:"displayName" binding:"required"`
}

func PostProfile(c *gin.Context) {
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

func Authenticate(initialiedCheck bool) gin.HandlerFunc {

	return func(c *gin.Context) {
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
		fmt.Printf("UID: %v, type: %T \n", token.UID, token.UID)

		// find or create
		user := models.User{}
		user.FindOrCreate(token.UID)

		if initialiedCheck {
			if user.Initialized == false {
				c.JSON(http.StatusNotFound, gin.H{
					"message": "not initialized.",
				})
				c.Abort()
			}
		}

		c.Set("user", user)
	}
}

func InitRouter(r *gin.Engine) {
	prefixV1 := r.Group("/api/v1")

	{
		// sample API
		prefixV1.GET("/hello", hello)
		prefixV1.GET("/private", Authenticate(true), GetPrivate)
		prefixV1.POST("/profile", Authenticate(false), PostProfile)
		// prefixV1.GET("/private", checkJWT(), GetPrivate)
	}
}
