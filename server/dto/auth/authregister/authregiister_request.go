package authdtoregister

type AuthRequestRegister struct {
	FullName string `json:"fullName" validate:"required"`
	UserName string `json:"userName" validate:"required"`
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}
