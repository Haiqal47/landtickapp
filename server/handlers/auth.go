package handlers

import (
	authdtologin "backend/dto/auth/authlogin"
	authdtoregister "backend/dto/auth/authregister"
	dto "backend/dto/result"
	"backend/models"
	"backend/pkg/bcrypt"
	jwtToken "backend/pkg/jwt"
	"backend/repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth{
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdtoregister.AuthRequestRegister)
	if err := c.Bind(request); err != nil {
  		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}

 	validation := validator.New()
  	err := validation.Struct(request)

  	if err != nil {
    	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}

  	password, err :=  bcrypt.HashingPassword(request.Password)
	if err != nil {
    	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}

	user := models.Users{
		FullName: request.FullName,
		UserName: request.UserName,
		Email:request.Email,
		Password: password,
	}

	dataRegister, err := h.AuthRepository.Register(user)
  	if err != nil {
    	return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
  	}

  	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: dataRegister}})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdtologin.AuthRequestLogin)
	if err := c.Bind(request); err != nil {
    return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  }

  user := models.Users{
	UserName: request.UserName,
	Password: request.Password,
  }
  user, err := h.AuthRepository.Login(user.UserName)
  if err != nil {
    return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  }

  isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
  if !isValid {
    return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "wrong username or password"})
  }

  claims := jwt.MapClaims{}
  claims["id"] = user.Id
//   claims["role"] = user.Role
  claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

  token, errGenerateToken := jwtToken.GenerateToken(&claims)
  if errGenerateToken != nil {
    log.Println(errGenerateToken)
    return echo.NewHTTPError(http.StatusUnauthorized)
  }

  loginResponse := authdtologin.AuthResponseLogin{
    FullName: user.FullName,
	UserName: user.UserName,
    Email:    user.Email,
    Token:    token,
	Role:     user.Role,	
  }

  return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: loginResponse}})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: user})
}