FROM nginx:alpine

COPY src/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.template.conf

ENV NGINX_ENVSUBST_FILTER=BACKEND_URL,STEM_REDIRECT_URL

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
