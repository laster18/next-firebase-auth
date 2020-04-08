package main

import (
	"api/config"
	"api/routers"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func init() {
	/* 環境変数を.envからよみこみ */
	// err := godotenv.Load(fmt.Sprintf("./%s.env", os.Getenv("GO_ENV")))
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("failed load .env err: ", err)
	}
}

func main() {
	// setup Config
	config.Setup()

	// setup Router
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:3001"},
		AllowMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"},
	}))
	router.Static("/assets", "./assets")
	routers.InitRouter(router)
	router.Run(":8080")
}
