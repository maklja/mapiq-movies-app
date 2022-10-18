FROM node:16.17.0

# Set default arguments to docker
ENV NODE_ENV=production
ARG SERVER_API_URL
ARG SERVER_API_VERSION
ARG API_KEY

WORKDIR /usr/src/

# Copy root package.json and package-lock.json
COPY ./package.json ./app/package.json
COPY ./package-lock.json ./app/package-lock.json
COPY ./tsconfig.json ./app/tsconfig.json

# Copy source code
COPY ./src/ ./app/src/
COPY ./public/ ./app/public/

# Move into build directory
WORKDIR /usr/src/app

# Install dependecies
RUN npm --production=false install

# Build application
RUN REACT_APP_API_KEY=${API_KEY} REACT_APP_SERVER_API_VERSION=${SERVER_API_VERSION} REACT_APP_SERVER_API_URL=${SERVER_API_URL} npm run build

# Move to working directory
WORKDIR /usr/src/

# Copy build app files
RUN cp -r /usr/src/app/build /usr/src/dist

# Build client package
#RUN REACT_APP_SERVER_URL=$SERVER_URL npm run build

# Remove build directory
RUN rm -rf app

# Start a web server for static files
RUN npm install -g serve

CMD ["serve", "./dist/"]