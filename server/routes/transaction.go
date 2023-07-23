package routes

import (
	"backend/handlers"
	"backend/pkg/middleware"
	"backend/pkg/mysql"
	"backend/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)

	h := handlers.HandlerTransaction(transactionRepository)

	e.GET("/transactions", middleware.Auth(h.FindTransaction))
	e.POST("/transaction", middleware.Auth(h.CreateTransaction))
	e.GET("/transaction/:id", middleware.Auth(h.GetTransactionById))
	e.DELETE("/transaction/:id", middleware.Auth(h.DeleteTransaction))
	e.GET("/transactionbyuser", middleware.Auth(h.GetTransactionByUser))
	e.POST("/notification", h.Notification)
	e.POST("/payment", h.PaymentTransaction)
}
