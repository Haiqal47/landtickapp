package ticketdto

import "backend/models"

type TicketResponse struct {
	TrainName            string `json:"name_train"`
	TrainType            string `json:"type_train"`
	StartDate            string `json:"start_date"`
	StartStationId       int    `json:"start_station_id"`
	StartTime            string `json:"start_time"`
	DestinationStationId int    `json:"destination_station_id"`
	ArrivalTime          string `json:"arrival_time"`
	Price                int    `json:"price"`
	Qty                  int    `json:"qty"`
	UserID               int    `json:"user_id"`
	User                 models.UserTicketResponse `json:"-"`
	
}

type TicketAllResponse struct {
	TrainName            string `json:"name_train"`
	TrainType            string `json:"type_train"`
	StartDate            string `json:"start_date"`
	StartStationId       int    `json:"start_station_id"`
	StartTime            string `json:"start_time"`
	DestinationStationId int    `json:"destination_station_id"`
	ArrivalTime          string `json:"arrival_time"`
	Price                int    `json:"price"`
	Qty                  int    `json:"qty"`
	UserId               int    `json:"-"`
	User                 models.UserTicketResponse `json:"-"`
}

type TicketDetailResponse struct {
	TrainName            string `json:"name_train"`
	TrainType            string `json:"type_train"`
	StartDate            string `json:"start_date"`
	StartStationId       int    `json:"start_station_id"`
	StartStation		 models.Stations `json:"start_station"`
	StartTime            string `json:"start_time"`
	DestinationStationId int    `json:"destination_station_id"`
	DestinationStation   models.Stations `json:"destination_station"`
	ArrivalTime          string `json:"arrival_time"`
	Price                int    `json:"price"`
	Qty                  int    `json:"qty"`
	UserId               int    `json:"-"`
	User                 models.UserTicketResponse `json:"user"`
}