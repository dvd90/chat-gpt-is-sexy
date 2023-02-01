/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
import { ValidationError } from 'express-validator';
import {
  ERROR_CODES,
  ExpressRoute,
  IApiErrorObj,
  IApiResponseObj,
  ICustomRequest,
  IErrorCode,
  indexedObject,
  LeanRequest,
  log,
  winstonLogger
} from '.';

/***
 * This decorator will force a "floating" function (instance function) to be bound to it's object
 */
export function bound(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: PropertyDescriptor
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: PropertyDescriptor
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);
    // const factory = (req: ICustomRequest,
    //                        res: express.Response): express.Response<unknown> => {
    //   return originalFunction(req, res);
    // }
    if (descriptor) {
      descriptor.value = originalFunction;
    }
  };
}

/***
 * This will surround a function with error catching
 */
export function handleError(): (
  target: indexedObject,
  propertyName: string,
  descriptor?: TypedPropertyDescriptor<ExpressRoute>
) => void {
  return (
    target: indexedObject,
    propertyName: string,
    descriptor?: TypedPropertyDescriptor<ExpressRoute>
  ): void => {
    const originalFunction = (
      descriptor?.value || (target as ExpressRoute)
    ).bind(target);

    const factory = async (
      req: ICustomRequest,
      res: express.Response
    ): Promise<express.Response<unknown>> => {
      try {
        return await originalFunction(req, res);
      } catch (error) {
        log(error);
        return errCatchResHandler(
          res,
          req,
          ERROR_CODES.SERVER_ERROR,
          `err in ${target.constructor.name}/${propertyName}`,
          error
        );
      }
    };
    if (descriptor) {
      descriptor.value = factory;
    } else {
      target = factory;
    }
  };
}

export function resHandler(
  res: express.Response,
  errCodeObj: IErrorCode,
  callId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
): express.Response<unknown, Record<string, unknown>> {
  const apiResponse: IApiResponseObj = {
    statusCode: errCodeObj.statusCode,
    errorCode: errCodeObj.id,
    statusReason: errCodeObj.statusReason,
    callId: callId ?? '',
    data,
    time: Date.now()
  };
  winstonLogger.info(errCodeObj.statusReason, {
    callId: callId ?? '',
    errorId: errCodeObj.id
  });

  return res.status(errCodeObj.statusCode).json(apiResponse);
}

function toLeanRequest({
  body,
  query,
  callId,
  path
}: ICustomRequest): LeanRequest {
  return { body, query, callId, path };
}
