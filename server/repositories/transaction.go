package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransactionById(Id int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransactionByUser(UserID int) ([]models.Transaction, error)
	GetTicketById(ID int) (models.Ticket, error)
	UpdateTransaction(status string, orderId int) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	PaymentTransaction(payment models.Transaction) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Find(&transaction).Error

	return transaction, err
}

func (r repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
} 

func (r *repository) GetTransactionById(Id int) (models.Transaction, error) {
	var data models.Transaction

	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").First(&data, Id).Error

	return data, err
} 

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransactionByUser(UserID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Preload("Ticket.StartStation").Preload("Ticket.DestinationStation").Where("user_id = ?", UserID).Find(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, orderId int) (models.Transaction, error) {
  var transaction models.Transaction
  r.db.Preload("Product").Preload("Buyer").Preload("Seller").First(&transaction, orderId)

  if status != transaction.Status && status == "success" {
    // var product models.Product
    // r.db.First(&product, transaction.Product.ID)
    // product.Qty = product.Qty - 1
    // r.db.Save(&product)
  }

  transaction.Status = status
  err := r.db.Save(&transaction).Error
  return transaction, err
}

func (r *repository) PaymentTransaction(payment models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&payment).Error
	return payment, err
}

