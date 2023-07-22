package repositories

import (
	"backend/models"

	"gorm.io/gorm"
) 

type UserRepository interface {
	FindUser() ([]models.Users, error)
	GetUser(Id int) (models.Users, error)
}

type repository struct {
	db *gorm.DB
}

func RepositoryUser(db *gorm.DB) *repository {
return &repository{db}
}

func (r *repository) FindUser() ([]models.Users, error) {
	var users []models.Users
	err := r.db.Raw("SELECT * FROM users").Scan(&users).Error

	return users, err
}

func (r *repository) GetUser(Id int) (models.Users, error) {
  var user models.Users
  err := r.db.Raw("SELECT * FROM users WHERE id=?", Id).Scan(&user).Error

  return user, err
}





