package config

import (
	"fmt"

	"github.com/caarlos0/env"
)

type DbConf struct {
	Driver   string `env:"DB_DRIVER" envDefault:"mysql"`
	User     string `env:"DB_USER" envDefault:"user"`
	Password string `env:"DB_PASSWORD" envDefault:"password"`
	Host     string `env:"DB_HOST" envDefault:"localhost"`
	Port     string `env:"DB_PORT"`
	Name     string `env:"DB_NAME" envDefault:"sample_db"`
}

var Db DbConf

func Setup() {
	if err := env.Parse(&Db); err != nil {
		fmt.Printf("failed to load config %s", err)
	}
}
