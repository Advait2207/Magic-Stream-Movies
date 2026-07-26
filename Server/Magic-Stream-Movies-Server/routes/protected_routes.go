package routes

import (
	controller "github.com/Advait2207/Magic-Stream-Movies/Server/Magic-Stream-Movies-Server/controllers"
	"github.com/Advait2207/Magic-Stream-Movies/Server/Magic-Stream-Movies-Server/middleware"
	"github.com/gin-gonic/gin"
)

func SetupProtectedRoutes(router *gin.Engine) {
	router.Use(middleware.AuthMiddleWare())

	router.GET("/movie/:imdb_id", controller.GetMovie())
	router.POST("/addmovie", controller.AddMovie())
}
