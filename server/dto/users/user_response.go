package usersdto

type UserResponse struct {
	Id       int    `json:"id"`
	FullName string `json:"fullName"`
	UserName string `json:"userName"`
	Email    string `json:"email"`
	Password string `json:"token"`
	Role string `json:"role"`
}