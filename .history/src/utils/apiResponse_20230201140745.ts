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
      const { resHandler } = req;
      try {
        return await originalFunction(req, res);
      } catch (error) {
        return resHandler.error(error);
      }
    };
    if (descriptor) {
      descriptor.value = factory;
    } else {
      target = factory;
    }
  };
}

function toLeanRequest({
  body,
  query,
  callId,
  path
}: ICustomRequest): LeanRequest {
  return { body, query, callId, path };
}
