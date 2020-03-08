## DB ### Users

- uid(firebase uid)
- display_name
- initialized
- created_at
- updated_at

### Posts

- title
- image_url
- user_id(FK)
- like_count
- created_at
- updated_at

### likes

- user_id(FK)
- post_id(FK)
- created_at

## API

### `posts`

- common params
  - token

- post_info
```json
{
  "title": "sample photo",
  "imageUrl": "http://localhost:8080/assets/images/hogehoge.png",
  "likeCount": "3",
  "createdAt": "2000-01-01T00:00:00+00:00",
  "updatedAt": "2000-01-01T00:00:00+00:00"
}
```

#### GET: /api/v1/posts

- params
 - none

- returns
  - (200, {"posts": [...post_info]})
  - (400, {"message": "error message"})

#### POST: /api/v1/posts

- params(multipart/form-data)
  - title
  - image

- returns
  - (201, {post_info})
  - (400, {"message": "Create Error"})

#### DELET: /api/v1/posts/:id

- params
  - none

- returns
  - (204, {"message": "ok"})
  - (400, {"message": "Delete Error"})
  - (403, {"message": "Forbidden"})
  - (404, {"message": "Not Found"})

#### PUT: /api/v1/posts/:id

- params
  - none

- returns
  - (200, {post_info})
  - (400, {"message": "Update Error"})
  - (403, {"message": "Forbidden"})
  - (404, {"message": "Not Found"})

### `likes`

- common params
  - token

#### POST: /api/v1/posts/:id/like

- params
  - none

- returns
  - (200, {"message": "liked"})
  - (400, {"message": "ng"})
  - (404, {"message": "Not Found"})

#### DELETE: /api/v1/posts/:id/like

- params
  - none

- returns
  - (204, {"message": "deleted"})
  - (400, {"message": "ng"})
  - (404, {"message": "Not Found"})
