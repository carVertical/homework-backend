import Fastify from 'fastify';

export const app = Fastify({
  logger: true,
});

app.register(import('./weather-data/weather-data.js'));
