import * as http from 'http';
import { app } from './app';
import { config } from './config';
const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Listen port ${config.PORT}`);
});

function handle(signal: any) {
  console.log(`Received ${signal}. Terminating the app...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on('SIGINT', handle);
process.on('SIGTERM', handle);

process.on('uncaughtException', error => {
  console.log(error);
});

process.on('unhandledRejection', error => {
  console.log(error);
});
