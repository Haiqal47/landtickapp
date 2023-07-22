package handlers

import (
	dto "backend/dto/result"
	stationsdto "backend/dto/stations"
	"backend/models"
	"backend/repositories"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerStation struct {
	StationRepository repositories.StationRepository
}

type dataStation struct {
	Station interface{} `json:"stations"`
}

func HandlerStation(StationRepository repositories.StationRepository) *handlerStation {
	return &handlerStation{StationRepository}
}

func (h *handlerStation) CreateStation(c echo.Context) error {
	request := new(stationsdto.StationResponse)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	station := models.Stations{
		StationName: request.StationName,	
	}

	DataStation, err := h.StationRepository.CreateStation(station)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataStation{Station: DataStation}})
}

func (h *handlerStation) FindStation(c echo.Context) error {
	stations, err := h.StationRepository.FindStation()
	if err != nil {
   		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}
  	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: dataUser{User: stations}})
}