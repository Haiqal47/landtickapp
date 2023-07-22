package transactiondto

type TransactionRequest struct {
	UserID   int `json:"user_id" form:"user_id"`
	TicketID int `json:"ticket_id" form:"ticket_id" validate:"required"`
}

type TransactionMidtrans struct {
	ID       int    `json:"id"`
	Price    int    `json:"price"`
	FullName string `json:"fullname"`
	Email    string `json:"email"`
}