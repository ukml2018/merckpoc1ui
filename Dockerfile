FROM node:18.13.0-alpine as builder
#FROM node:18.13.0-alpine
#RUN apk add --no-cache chromium
#ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser 
COPY . /app
WORKDIR /app
RUN npm install

RUN npm run build

FROM nginx:1.17.10-alpine

COPY --from=builder /app/dist/poc-new/browser usr/share/nginx/html
EXPOSE 80
