import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    throw new RequestValidationError(errors.array());
  }
  next();
};
