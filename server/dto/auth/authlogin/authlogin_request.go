package authdtologin

type AuthRequestLogin struct {
	UserName string `json:"userName" validate:"required"`
	Password string `json:"password" validate:"required"`
}