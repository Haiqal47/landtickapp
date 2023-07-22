package handlers

import (
	dto "backend/dto/result"
	usersdto "backend/dto/users"
	"backend/models"
	"backend/repositories"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

type handlerUser struct {
	UserRepository repositories.UserRepository
}

type dataUser struct {
	User interface{} `json:"users"`
}

func HandlerUser(UserRepository repositories.UserRepository) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) FindUser(c echo.Context) error {
	users, err := h.UserRepository.FindUser()
	if err != nil {
   		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}
  	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: users}})
}

func (h *handlerUser) GetUser(c echo.Context) error {
  id, _ := strconv.Atoi(c.Param("id"))

  user, err := h.UserRepository.GetUser(id)
  if err != nil {
    return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  }

  return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: convertResponse(user)}} )
}

func convertResponse(u models.Users) usersdto.UserResponse {
  return usersdto.UserResponse{
    Id:       u.Id,
    FullName: u.FullName,
	UserName: u.UserName,
    Email:    u.Email,
  }
}