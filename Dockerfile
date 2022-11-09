# FROM buildkite/puppeteer:10.0.0 as react-build

# ARG REACT_APP_API_BASE_URL
# COPY FrontendTopRestaurant /opt/FrontendTopRestaurant
# WORKDIR /opt/FrontendTopRestaurant
# RUN npm ci --only=production && npm run build


FROM node:18.12-alpine3.15
ENV MONGODB_URI="mongodb+srv://LuisEUM:0bvwrdrXRENbO4fC@toprestaurant.nh5otgj.mongodb.net/?retryWrites=true&w=majority" CLOUDINARY_URL="cloudinary://937733417757663:B0Od4-yXubSZR8ox8lMWPrfAPNk@luiseum"

COPY api /opt/api
WORKDIR /opt/api
RUN npm ci --only=production 

# COPY --from

EXPOSE 4001

CMD ["npm","start"]