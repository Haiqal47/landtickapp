package models

type Ticket struct {
	Id                   int                `json:"id" gorm:"primarykey:autoIncrement"`
	TrainName            string             `json:"name_train" gorm:"type: varchar(255)"`
	TrainType            string             `json:"type_train" gorm:"type: varchar(255)"`
	StartDate            string             `json:"start_date" gorm:"type: varchar(255)"`
	StartStationId       int                `json:"start_station_id"`
	StartStation         Stations           `json:"start_station"`
	StartTime            string             `json:"start_time" gorm:"type: varchar(255)"`
	DestinationStationId int                `json:"destination_station_id"`
	DestinationStation   Stations           `json:"destination"`
	ArrivalTime          string             `json:"arrival_time" gorm:"type: varchar(255)"`
	Price                int                `json:"price"`
	Qty                  int                `json:"qty"`
	UserID               int                `json:"-"`
	User                 UserTicketResponse `json:"-"`
}

type TicketResponse struct {
	Id                   int      `json:"id"`
	TrainName            string   `json:"name_train"`
	TrainType            string   `json:"type_train"`
	StartDate            string   `json:"start_date"`
	StartStationId       int      `json:"start_station_id"`
	StartStation         Stations `json:"start_station"`
	StartTime            string   `json:"start_time"`
	DestinationStationId int      `json:"destination_station_id"`
	DestinationStation   Stations `json:"destination"`
	ArrivalTime          string   `json:"arrival_time"`
	Price                int      `json:"price"`
	Qty                  int      `json:"qty"`
	UserID               int      `json:"-"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}

type TicketTransactionResponse struct {
	Id                   int      `json:"id"`
	TrainName            string   `json:"name_train"`
	TrainType            string   `json:"type_train"`
	StartDate            string   `json:"start_date"`
	StartStationId       int      `json:"start_station_id"`
	StartStation         Stations `json:"start_station"`
	StartTime            string   `json:"start_time"`
	DestinationStationId int      `json:"destination_station_id"`
	DestinationStation   Stations `json:"destination"`
	ArrivalTime          string   `json:"arrival_time"`
	Price                int      `json:"price"`
}

func (TicketTransactionResponse) TableName() string {
	return "tickets"
}