import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const healthController = (_req: Request, res: Response): void => {
  res.status(StatusCodes.OK).send('Auth Service is healthy');
};
