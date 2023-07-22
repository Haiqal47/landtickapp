package usersdto

type CreateUserRequest struct {
	FullName    string `json:"fullName" validate:"required"`
	NoHandphone string `json:"noHandphone" validate:"required"`
	UserName    string `json:"userName" validate:"required"`
	Email       string `json:"email" validate:"required"`
	Password    string `json:"password" validate:"required"`
}