import { app } from './app.js';

let shutdown = () => {
  app.log.info('Gracefully shutting down');
  app.close();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

app.listen({ port: 3000, host: '::' }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
