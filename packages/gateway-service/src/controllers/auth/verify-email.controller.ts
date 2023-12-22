import { authService } from '@gateway/services/api/auth.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class VerifyEmailController {
  public async verifyEmail(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await authService.verifyEmail(
      req.body.token,
    );

    res
      .status(StatusCodes.CREATED)
      .json({ message: response.data.message, user: response.data.user });
  }
}
