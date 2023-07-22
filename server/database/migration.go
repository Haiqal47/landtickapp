package database

import (
	"backend/models"
	"backend/pkg/mysql"
	"fmt"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.Users{}, 
		&models.Stations{},
		&models.Ticket{},
		&models.Transaction{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration Faiiled")
	}

	fmt.Println("Migration Success")
}