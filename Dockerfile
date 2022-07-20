FROM nginx:1.19.6-alpine
# FROM gcr.io/production-credit/nginx:1.19.6-alpine

COPY ./build/ /usr/share/nginx/html/