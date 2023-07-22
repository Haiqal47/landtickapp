package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type StationRepository interface {
	CreateStation(station models.Stations) (models.Stations, error)
	FindStation() ([]models.Stations, error)
}

func RepositoryStation(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateStation(station models.Stations) (models.Stations, error) {
	err := r.db.Create(&station).Error

	return station, err
}

func (r *repository) FindStation() ([]models.Stations, error) {
	var stations []models.Stations
	err := r.db.Raw("SELECT * FROM stations").Scan(&stations).Error

	return stations, err
}

