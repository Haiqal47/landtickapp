package authdtologin

type AuthResponseLogin struct {
	FullName string `json:"fullName"`
	UserName string `json:"userName"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Role 	 string `json:"role"`
}