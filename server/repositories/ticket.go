package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type TicketRepository interface {
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	GetTicket() ([]models.Ticket, error)
	GetTicketById(Id int) (models.Ticket, error)
	FilterTickets(startStationID, destinationStationID int) ([]models.Ticket, error)

}

func RepositoryTicket (db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Create(&ticket).Error

	return ticket, err
}

func (r *repository) GetTicket() ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err
}

func (r *repository) GetTicketById(Id int) (models.Ticket, error) {
	var ticket models.Ticket

	err := r.db.Preload("StartStation").Preload("DestinationStation").Preload("User").First(&ticket, Id).Error

	return ticket, err
}

func (r repository) FilterTickets(StartStationID, DestinationStationID int) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_station_id = ? AND destination_station_id = ?", StartStationID, DestinationStationID).Preload("StartStation").Preload("DestinationStation").Find(&tickets).Error

	return tickets, err

}