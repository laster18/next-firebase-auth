package middlewares

import (
	"api/db"
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

func Authentication(enableInitialiedCheck bool, sqlhandler db.ISqlHandler) gin.HandlerFunc {
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
		idToken := strings.Replace(authHeader, "Bearer ", "", 1)

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

		// find or create
		user := models.User{Db: sqlhandler}
		user.FindOrCreate(token.UID)

		if enableInitialiedCheck {
			if user.Initialized == false {
				c.JSON(http.StatusNotFound, gin.H{
					"message": "not initialized.",
				})
				c.Abort()
			}
		}

		// contextにuserをセット
		c.Set("user", user)
	}
}
