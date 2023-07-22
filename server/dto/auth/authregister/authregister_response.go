package authdtoregister

type AuthResponseRegister struct {
	FullName string `json:"fullName"`
	UserName string `json:"userName"`
	Email    string `json:"email"`
	Password string `json:"-"`
}
