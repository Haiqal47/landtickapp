package ticketdto

type CreateTicketRequest struct {
	TrainName            string `json:"name_train" form:"name_train" validate:"required"`
	TrainType            string `json:"type_train" form:"type_train" validate:"required"`
	StartDate            string `json:"start_date" form:"start_date" validate:"required"`
	StartStationId       string `json:"start_station_id" form:"start_station_id" validate:"required"`
	StartTime            string `json:"start_time" form:"start_time" validate:"required"`
	DestinationStationId string `json:"destination_station_id" form:"destination_station_id" validate:"required"`
	ArrivalTime          string `json:"arrival_time" form:"arrival_time" validate:"required"`
	Price                string `json:"price" form:"price" validate:"required"`
	Qty                  string `json:"qty" form:"qty" validate:"required"`
	// UserId               int    `json:"user_id" validate:"required"`
}