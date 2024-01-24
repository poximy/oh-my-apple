FROM node:lts-alpine as build

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY tailwind.config.js .

COPY src/ src/

RUN	npm run build-css

FROM golang:bookworm as compile

WORKDIR /go/src/compile

COPY . .

COPY --from=build build/public/ public/

RUN go mod download

RUN CGO_ENABLED=1 go build -o /go/bin/app

FROM gcr.io/distroless/base-debian12

COPY --from=build build/public/ public/

COPY --from=compile /go/bin/app /

COPY src/ src/

CMD ["./app"]
