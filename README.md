# Tempradar Sensor API
[![Build and deploy](https://github.com/irealworlds/tempradar-sensor-api/actions/workflows/build_and_deploy.yml/badge.svg)](https://github.com/irealworlds/tempradar-sensor-api/actions/workflows/build_and_deploy.yml)

An API for receiving data from a Tempradar sensor set and storing that data for later querying by clients.

View image on [Docker Hub](https://hub.docker.com/r/irealworlds/tempradar-sensor-api)

## Running
#### A. Running with Docker
1. Clone the repository
2. Start the image using Docker Compose

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml -p tempradar-sensor up --remove-orphans -d --build
```
> **Note:** This command starts the application in _development mode_. If you want to run in production, omit loading `docker-compose.dev.yml`

> **Note:** This command will run the application in _detached mode_.

#### B. Running without Docker
1. Clone the repository
2. Copy the `.env.example` file to `.env` and fill in your environment variables
3. Install dependencies using `npm install`
4. Start Nest's development server using `npm run start`

## See also
- [irealworlds/tempradar-webapp](https://github.com/irealworlds/tempradar-webapp) - The Tempradar web application, built in Angular.
- [irealworlds/tempradar-api](https://github.com/irealworlds/tempradar-api) - The .NET WebApi powering the Tempradar web app.
- [irealworlds/tempradar-sensor](https://github.com/irealworlds/tempradar-sensor) - Code powering Tempradar Arduino sensor sets.

## License
This project is [MIT licensed](LICENSE).
