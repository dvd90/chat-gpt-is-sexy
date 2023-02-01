import express from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { ERROR_CODES, ICustomRequest } from '.';

export class BodyValidator {
  static test(): (
    | ValidationChain
    | ((
        req: ICustomRequest,
        res: express.Response,
        next: express.NextFunction
      ) => void | express.Response<unknown>)
  )[] {
    return [
      this.checkNotEmpty('email', 'email'),
      check('email').isEmail().normalizeEmail(),

      this.errValidationMiddleware
    ];
  }

  // Response Handler for validation errors
  static errValidationMiddleware(
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): express.Response<unknown> | void {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resHandler.validation(errors.array());
    }

    next();
  }

  private static checkNotEmpty(
    field: string,
    message: string
  ): ValidationChain {
    return check(field, `${message} is required`).not().isEmpty();
  }
}
