
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE users (
  id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  firebase_uid varchar(255) UNIQUE NOT NULL,
  display_name varchar(255) NOT NULL DEFAULT '',
  icon_url varchar(255) NOT NULL DEFAULT '',
  profile_text varchar(255) NOT NULL DEFAULT '',
  initialized boolean NOT NULL DEFAULT '0',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE IF EXISTS users;
