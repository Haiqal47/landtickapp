package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	ticketRepository := repositories.RepositoryTicket(mysql.DB)

	h := handlers.HandlerTicket(ticketRepository)

	e.POST("/ticket",  middleware.Auth(h.CreateTicket))
	e.GET("/tickets",  h.GetTicket)
	e.GET("/ticket/:id",  h.GetTicketById)
	e.GET("/ticket", h.FilterTickets)
}