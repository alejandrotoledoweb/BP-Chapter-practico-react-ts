FROM nginx:alpine

# Set Timezone
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/America/Guayaquil /etc/localtime
RUN apk del tzdata

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /etc/nginx/conf.d

# Configure Nginx
RUN rm -rf /usr/share/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /usr/share/nginx/html/secret
WORKDIR /usr/share/nginx/html
COPY /build/ .

