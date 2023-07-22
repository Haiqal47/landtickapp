package handlers

import (
	dto "backend/dto/result"
	ticketdto "backend/dto/ticket"
	"backend/models"
	"backend/repositories"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository repositories.TicketRepository
}

func HandlerTicket (TicketRepository repositories.TicketRepository) *handlerTicket {
	return &handlerTicket{TicketRepository}
}

func (h *handlerTicket) CreateTicket(c echo.Context) error {
	request := new(ticketdto.CreateTicketRequest)

	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})

	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	parseStartStationId,_ := strconv.Atoi(request.StartStationId)
	parseDestinationStationId,_ := strconv.Atoi(request.DestinationStationId)
	parsePrice,_ := strconv.Atoi(request.Price)
	parseQty,_ := strconv.Atoi(request.Qty)

	ticket := models.Ticket {
		TrainName: request.TrainName,
		TrainType: request.TrainType,
		StartDate: request.StartDate,
		StartStationId: parseStartStationId,
		StartTime: request.StartTime,
		DestinationStationId: parseDestinationStationId,
		ArrivalTime: request.ArrivalTime,
		Price: parsePrice,
		Qty: parseQty,
		UserID: int(userId),
	}

	DataTicket, err := h.TicketRepository.CreateTicket(ticket)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTicketResponse(DataTicket)})

}

func (h *handlerTicket) GetTicket(c echo.Context) error {
	var tickets []models.Ticket
	tickets, err := h.TicketRepository.GetTicket()
	if err != nil {
   		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}
  	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: tickets})

}

func (h *handlerTicket) GetTicketById(c echo.Context) error {
	Id, _ := strconv.Atoi(c.Param("id"))

	ticket, err := h.TicketRepository.GetTicketById(Id)
	if err != nil {
   		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
  	}
  	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertDetailTicketResponse(ticket)})

}

func convertTicketResponse(u models.Ticket) ticketdto.TicketResponse {
	return ticketdto.TicketResponse{
		TrainName: u.TrainName,
		TrainType: u.TrainType,
		StartDate: u.StartDate,
		StartStationId: u.StartStationId,
		StartTime: u.StartTime,
		DestinationStationId: u.DestinationStationId,
		ArrivalTime: u.ArrivalTime,
		Price: u.Price,
		Qty: u.Qty,
		UserID: u.UserID,
	}
}

func convertDetailTicketResponse(u models.Ticket) ticketdto.TicketDetailResponse {
	return ticketdto.TicketDetailResponse{
		TrainName: u.TrainName,
		TrainType: u.TrainType,
		StartDate: u.StartDate,
		StartStationId: u.StartStationId,
		StartStation: u.StartStation,
		StartTime: u.StartTime,
		DestinationStationId: u.DestinationStationId,
		DestinationStation: u.DestinationStation,
		ArrivalTime: u.ArrivalTime,
		Price: u.Price,
		Qty: u.Qty,
		User: u.User,
	}
}

func (h *handlerTicket) FilterTickets(c echo.Context) error {
	startStationIDParam := c.QueryParam("start_station_id")
	destinationStationIDParam := c.QueryParam("destination_station_id")

	var startStationID int
	if startStationIDParam != "" {
		var err error
		startStationID, err = strconv.Atoi(startStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid start_station_id"})
		}
	}

	var destinationStationID int
	if destinationStationIDParam != "" {
		var err error
		destinationStationID, err = strconv.Atoi(destinationStationIDParam)
		if err != nil {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: "Invalid destination_station_id"})
		}
	}

	ticket, err := h.TicketRepository.FilterTickets(startStationID, destinationStationID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusBadRequest, Data: ticket})
}