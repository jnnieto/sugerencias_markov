FROM node:16-alpine3.12 as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build usr/local/app/dist/cliente /usr/share/nginx/html
