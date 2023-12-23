import http from 'http';
import { Logger } from 'winston';
import {
  Application,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { winstonLogger } from '@base/logger';
import { config } from '@gig/config';
import { verify } from 'jsonwebtoken';
import { IAuthPayload } from '@base/interfaces/auth.interface';
import { checkConnection, createIndex } from '@gig/elasticsearch';
import { CustomError, IErrorResponse } from '@base/custom-error-handler';
import { appRoutes } from '@gig/routes';
import { createConnection } from '@gig/queues/connection';
import { Channel } from 'amqplib';

const SERVER_PORT = 4004;
const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'userServer',
  'debug',
);

let gigChannel: Channel;

const start = (app: Application): void => {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueue();
  startElasticSearch();
  userErrorHandler(app);
  startServer(app);
};

const securityMiddleware = (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    }),
  );
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = verify(token, config.JWT_TOKEN!) as IAuthPayload;
      req.currentUser = payload;
    }
    next();
  });
};

const standardMiddleware = (app: Application): void => {
  app.use(compression());
  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ limit: '200mb', extended: true }));
};

const routesMiddleware = (app: Application): void => {
  appRoutes(app);
};

const startQueue = async (): Promise<void> => {
  gigChannel = (await createConnection()) as Channel;
};

const startElasticSearch = (): void => {
  checkConnection();
  createIndex('gigs');
};

const userErrorHandler = (app: Application): void => {
  app.use(
    (
      error: IErrorResponse,
      _req: Request,
      res: Response,
      next: NextFunction,
    ) => {
      log.log('error', `GigService ${error.comingFrom}: `, error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serializeError());
      }
      next();
    },
  );
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Gig Server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Gig Server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', `GigService startServer() method: `, error);
  }
};

export { start, gigChannel };
