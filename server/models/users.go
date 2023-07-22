package models

type Users struct {
	Id          int              `json:"id"`
	FullName    string           `json:"fullName" gorm:"type: varchar(255)"`
	NoHandphone string           `json:"noHandphone" gorm:"type: varchar(255)"`
	UserName    string           `json:"userName" gorm:"type: varchar(255)"`
	Email       string           `json:"email" gorm:"type: varchar(255)"`
	Password    string           `json:"password" gorm:"type: varchar(255)"`
	// Tickets     []TicketResponse `json:"tickets" gorm:"foreignKey:UserID"`
	Role     	string 			 `json:"role" gorm:"default:'user'"`
}

type UserTicketResponse struct {
	ID          int    `json:"-"`
	FullName    string `json:"name"`
	NoHandphone string `json:"no_hp"`
	Email       string `json:"email"`
}

func (UserTicketResponse) TableName() string {
	return "users"
}

type UserTransactionResponse struct {
	ID          int    `json:"-"`
	FullName    string `json:"name"`
	Email       string `json:"email"`
	NoHandphone string `json:"no_hp"`
}

func (UserTransactionResponse) TableName() string {
	return "users"
}