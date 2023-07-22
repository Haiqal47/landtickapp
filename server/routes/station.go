package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/labstack/echo/v4"
)

func StationRoutes(e *echo.Group) {
	stationRepository := repositories.RepositoryStation(mysql.DB)
	h := handlers.HandlerStation(stationRepository)

	e.POST("/station", middleware.Auth(h.CreateStation))
	e.GET("/stations", h.FindStation)
}
