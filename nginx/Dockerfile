FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
# envsubst 사용할때, 전달할 특정 환경변수들을 $$ENV_VAR처럼 기재해줘야 함 
# 그렇지 않으면 nginx.conf 파일내에서 $가 들어간 변수(예: try_files $uri /index.html)를 인식하지 못해서 리액트 라우팅이 제대로 되지 않을수도 있음
CMD ["/bin/sh", "-c", "envsubst '$$NODE_PORT $$NGINX_PORT' < /etc/nginx/mern.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]  # 환경변수 주입 


