package models

type Transaction struct {
	ID       int                       `json:"id" gorm:"primary_key:auto_increment"`
	UserID   int                       `json:"user_id"`
	User     UserTransactionResponse   `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                       `json:"ticket_id"`
	Ticket   TicketTransactionResponse `json:"ticket" gorm:"foreignKey:TicketID"`
	Image    string                    `json:"image" form:"image" gorm:"type: varchar(255)"`
	Status   string                    `json:"status" gorm:"default:'pending'"`
	Total    int                       `json:"total" form:"total"`
	Qty      int                       `json:"qty" form:"qty"`
}
