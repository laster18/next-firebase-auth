
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE posts (
  id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title varchar(255) NOT NULL,
  image_url varchar(255) NOT NULL,
  like_count int UNSIGNED NOT NULL DEFAULT '0',
  user_id int UNSIGNED NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT posts_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE IF EXISTS posts;
