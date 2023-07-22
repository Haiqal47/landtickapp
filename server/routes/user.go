package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/labstack/echo/v4"
)

func UserRoutes(e *echo.Group) {
	userRepository := repositories.RepositoryUser(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users",  middleware.Auth(h.FindUser))
	e.GET("/user/:id",  middleware.Auth(h.GetUser))
}
