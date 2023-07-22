package transactiondto

import "backend/models"

type TransactionResponse struct {
	ID  	int 								`json:"id"`
	UserID	int									`json:"user_id"`
	User 	models.UserTransactionResponse 		`json:"User"`
	TicketID int								`json:"ticket_id"`
	Ticket 	models.TicketTransactionResponse 	`json:"Ticket"`
	Image 	string 								`json:"image" form:"image"`
	Status  string								`json:"status"`
}