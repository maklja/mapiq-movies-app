# Upcoming Movies Web App

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Development

In order to install project dependencies run command

```console
npm install
```

Create configuration `.env` file on the root of the project. See `.env.example` for more details.

## Testing

In order to run integration tests execute command.

```console
npm test
```

To run automation tests run command:

```console
npm run test-automation
```

By default automation tests expect that the server is running on `localhost:3001`, you can change the expected address by providing an environment variable named `TEST_SERVER_URL`.

## Run application using docker

In order to create a docker image and run it with a container execute the following command.

```console
docker build --tag movie-app:latest --build-arg API_KEY=<api_key> ./
docker run --publish 3001:3000 --detach movie-app
```

After the docker container starts, the application is available on `localhost:3001`.

## Dependencies

-   **React** - used for UI
-   **Redux** (Redux toolkit) - state management.
-   **Material UI** - used for UI components and for responsive UI.
-   **Axios** - used to send request to BE API.
-   **Jest** - as a test runner and for assentation.
-   **React Testing Library** - used to write UI integration tests.
-   **Puppeteer** - used to run automation tests.
-   **msw** - for mocking API request in integration tests.
-   **workbox...** - used for service worker to enable file caching for offline mode.
-   **use-debounce** - debounce hooks used to delay request sending while user is typing.
-   **http-status-codes** - used for status codes.
-   **eslint** - code style rule.
-   **prettier** - code formatting.

## Screenshots

### Screenshot 1 - Main movies window

![Screenshot 1](screenshots/Screenshot_1.png?raw=true 'Main window')

### Screenshot 2 - Main movies window with a search

![Screenshot 2](screenshots/Screenshot_2.png?raw=true 'Main window with search')

### Screenshot 3 - Movie detail window

![Screenshot 3](screenshots/Screenshot_3.png?raw=true 'Detail window')

