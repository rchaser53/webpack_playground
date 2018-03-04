FROM redis:4.0.8-alpine

RUN apk update && rm -rf /var/cache/apk/*