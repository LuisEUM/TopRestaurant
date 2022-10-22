FROM buildkite/puppeteer:10.0.0 as react-build

ARG REACT_APP_API_BASE_URL
COPY FrontendTopRestaurant /opt/FrontendTopRestaurant
WORKDIR /opt/FrontendTopRestaurant
RUN npm ci --only=production && npm run build


FROM node:16.8-alpine3.15

COPY api /opt/api
WORKDIR /opt/api
RUN npm ci --only=production 

COPY --from

Expose 4001

CMD ["npm","start"]


