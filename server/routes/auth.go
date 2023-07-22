package routes

import (
	"backend/handlers"
	"backend/pkg/mysql"
	"backend/repositories"
	"backend/pkg/middleware"

	"github.com/labstack/echo/v4"
)

func AuthRotes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/check-auth", middleware.Auth(h.CheckAuth))
}