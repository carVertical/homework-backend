import weatherStations from './weather-stations.json' with { type: 'json' };
import { nextGaussian, randomInt, round } from '../utils/math.js';
import type { Schema } from 'fast-json-stringify';
import { Readable } from 'node:stream';
import { ensureRate, raiseErrorRandomly, toJsonl } from '../utils/streams.js';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { crashAfter, crashChance, itemsPerSecond } from '../env.js';

const responseSchema: Schema = {
  title: 'Response schema',
  type: 'object',
  properties: {
    city: { type: 'string' },
    temperature: { type: 'number' },
  },
};

type WeatherDatapoint = { city: string; temperature: number };

async function* streamDatapoints() {
  while (true) {
    const { city, mean } = weatherStations[randomInt(weatherStations.length)];
    const temperature = round(nextGaussian(mean, 10), 1);
    yield { city, temperature };
  }
}

async function* filterByCity(generator: AsyncGenerator<WeatherDatapoint>, cities: string[] | undefined = []) {
  const lowercasedCities = new Set(cities.map((city) => city.toLowerCase()));
  for await (const item of generator) {
    if (lowercasedCities.size === 0 || lowercasedCities.has(item.city.toLowerCase())) {
      yield item;
    }
  }
}

export default async (fastify: FastifyInstance) => {
  fastify.get(
    '/weather-data',
    { schema: { querystring: { cities: { type: 'string' } } } },
    (request: FastifyRequest<{ Querystring: { cities?: string } }>, reply) => {
      reply.send(
        Readable.from(
          toJsonl(
            responseSchema,
            ensureRate(
              raiseErrorRandomly(filterByCity(streamDatapoints(), request.query.cities?.split(',')), {
                skipItems: crashAfter(),
                crashProbability: crashChance(),
              }),
              { itemsPerSecond: itemsPerSecond() },
            ),
          ),
        ),
      );
    },
  );
};
