# common build
FROM golang:1.13-alpine as base
ENV GO111MODULE=on
COPY . /api
WORKDIR /api
RUN apk update \
  && apk add --no-cache git \
  && apk add gcc musl-dev \
  && apk add mariadb-client \
  && go get -u bitbucket.org/liamstask/goose/cmd/goose \
  && go mod download

# development build
FROM base as development
ENV GO_ENV=development
RUN GO111MODULE=off go get -u github.com/codegangsta/gin
RUN chmod +x ./start.sh
EXPOSE 8080
ENTRYPOINT ["sh", "./start.sh"]

# production build
FROM base as builder
RUN go build -a -tags "netgo" -installsuffix netgo -ldflags="-s -w -extldflags \"-static\"" -o=/app/build main.go

FROM golang:1.13-alpine as production
WORKDIR /app
ENV GO_ENV=production
COPY --from=builder /app/build /app/build
COPY --from=builder /api/start.sh ./
RUN apk update \
  && apk add --no-cache git \
  && apk add mariadb-client
RUN chmod +x ./start.sh && chmod u+x /app/build
EXPOSE 8080
ENTRYPOINT ["sh", "./start.sh"]