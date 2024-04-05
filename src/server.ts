import { app } from './app.js';

app.listen({ port: 3000, host: '::' }, function (err) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
