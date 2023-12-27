import 'express-async-errors';
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
import cookieSession from 'cookie-session';
import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { StatusCodes } from 'http-status-codes';
import { winstonLogger } from '@base/logger';
import { CustomError, IErrorResponse } from '@base/custom-error-handler';
import { config } from '@gateway/config';
import { elasticSearch } from '@gateway/elasticsearch';
import { appRoutes } from '@gateway/routes';
import { axiosAuthInstance } from '@gateway/services/api/auth.service';
import { axiosBuyerInstance } from '@gateway/services/api/buyer.service';
import { axiosSellerInstance } from '@gateway/services/api/seller.service';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import { SocketIOAppHandler } from '@gateway/sockets/socket';

const SERVER_PORT = 4000;
const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'apiGatewayServer',
  'debug',
);

export let socketIO: Server;

export class GatewayServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startElasticSearch();
    this.errorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 7 * 24 * 1000 * 3600,
        secure: config.NODE_ENV !== 'development',
        ...(config.NODE_ENV !== 'development' && {
          sameSite: 'none',
        }),
      }),
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
      }),
    );

    app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.session?.jwt) {
        axiosAuthInstance.defaults.headers['Authorization'] =
          `Bearer ${req.session?.jwt}`;
        axiosBuyerInstance.defaults.headers['Authorization'] =
          `Bearer ${req.session?.jwt}`;
        axiosSellerInstance.defaults.headers['Authorization'] =
          `Bearer ${req.session?.jwt}`;
      }
      next();
    });
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ limit: '200mb', extended: true }));
  }

  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }

  private startElasticSearch(): void {
    elasticSearch.checkConnection();
  }

  private errorHandler(app: Application): void {
    app.use('*', (req: Request, res: Response, next: NextFunction) => {
      const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      log.log('error', `That ${fullUrl} endpoint doesn not exist.`, '');
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'That API endpoint doesn not exist.' });
      next();
    });
    app.use(
      (
        error: IErrorResponse,
        _req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        log.log('error', `GatewayService ${error.comingFrom}: `, error);
        if (error instanceof CustomError) {
          res.status(error.statusCode).json(error.serializeError());
        }
        next();
      },
    );
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(app);
      const socketIO: Server = await this.createSocketIO(httpServer);

      this.startHttpServer(httpServer);
      this.socketIOConnection(socketIO);
    } catch (error) {
      log.log('error', `GatewayService startServer() method: `, error);
    }
  }

  private async createSocketIO(httpServer: http.Server): Promise<Server> {
    const io: Server = new Server(httpServer, {
      cors: {
        origin: `${config.CLIENT_URL}`,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
      },
    });

    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));

    socketIO = io;

    return io;
  }

  private socketIOConnection(io: Server): void {
    const socketIOApp = new SocketIOAppHandler(io);
    socketIOApp.listen();
  }

  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      log.info(
        `Worker with process id of ${process.pid} on gateway server has started`,
      );
      httpServer.listen(SERVER_PORT, () => {
        log.info(`GatewayServer is running on port number ${SERVER_PORT}.`);
      });
    } catch (error) {
      log.log('error', `GatewayService startHttpServer() method: `, error);
    }
  }
}
