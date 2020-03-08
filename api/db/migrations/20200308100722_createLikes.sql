
-- +goose Up
-- SQL in section 'Up' is executed when this migration is applied
CREATE TABLE likes (
  id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id int UNSIGNED NOT NULL,
  post_id int UNSIGNED NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_fk_user_id
    FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE,
  CONSTRAINT likes_fk_post_id
    FOREIGN KEY (post_id)
    REFERENCES posts (id)
    ON DELETE CASCADE,
  UNIQUE likes_user_id_post_id_index (user_id, post_id)
);

-- +goose Down
-- SQL section 'Down' is executed when this migration is rolled back
DROP TABLE IF EXISTS likes;
