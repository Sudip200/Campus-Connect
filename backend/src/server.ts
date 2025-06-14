import app from './app';
import MongoConnection from './db/mongo/connection';
import logger from './logger';
import config from './config/config';
import { NotFoundError } from './errors';
import { Request,Response,NextFunction } from 'express';
import { ApplicationError } from './errors';
const mongoConnection = new MongoConnection(config.MONGO_URL);

if (config.MONGO_URL == undefined) {
  logger.log({
    level: 'error',
    message: 'MONGO_URL not specified in environment',
  });
  process.exit(1);
  process.stdin.emit('SIGINT');
} else {
  mongoConnection.connect(() => {
    app.listen(app.get('port'), (): void => {
      app.use((req, res, next) =>
        next(new NotFoundError('We are unable to locate requested API resource', 404, 'API_ENDPOINT_NOT_FOUND')),
      );
      app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
          return next(err);
        }

        return res.status(err.status || 500).json({
          error: config.isDevelopment ? err : undefined,
          message: err.message,
        });
      });
      
      logger.info(`*\t🌏 Express server started at http://localhost:${app.get('port')}\t\t*`);
      if (config.isDevelopment) {
        logger.debug(`*\t⚙️  Swagger UI hosted at http://localhost:${app.get('port')}/__VERSION__/dev/api-docs\t*`);
      }
    });
  });
}

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('\nGracefully shutting down');
  mongoConnection.close((err) => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err,
      });
    }
    process.exit(0);
  });
});
