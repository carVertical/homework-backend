# Homework for backend chapter

Create an API with the following features:
1. start consuming weather data with an optional city filter;
2. stop consuming weather data;
3. fetch already collected weather data points;
4. see the collected temperature measurements in CloudWatch.

Use any tech stack you are most comfortable with, but [serverless framework](https://www.serverless.com/) with NodeJS
is preferred.

## Weather service

The weather data you will be consuming is provided by a mock weather service that is part of this repository. The
service simulates real-time weather data streaming and is prepared specifically for this homework assignment.

To get the weather data call `GET /weather-data`. The data is streamed as a JSONL in the following format:
```
{"city": string, "temperature": float}
```

`GET /weather-data` also accepts a parameter `cities` to only get the data for the specified cities. The parameter value
is a comma-separated case-insensitive list of city names.

The fastest way to test the service is with docker:
```shell
docker build -t weather-service https://github.com/carVertical/homework-backend.git
docker run --rm -p 3000:3000 weather-service
```

Or as a less ephemeral approach with docker compose:
```yaml
services:
  weather-service:
    build: https://github.com/carVertical/homework-backend.git
    ports:
      - "3000:3000"
    environment:
      ITEMS_PER_SECOND: 10000 # change this value to test different scenarios
```

Then call the service:
```bash
curl --silent 'http://localhost:3000/weather-data'
```
