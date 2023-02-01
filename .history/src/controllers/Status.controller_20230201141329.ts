import express from 'express';

import {
  // AgendaJob,
  // errCatchResHandler,
  ERROR_CODES,
  ICustomRequest
} from '../utils';
import { handleError, route } from '../decorators';
import { Routable } from '../routes/routable';

// noinspection JSUnusedGlobalSymbols
export class StatusController extends Routable {
  constructor() {
    super('/status');
  }
  /**
   * @desc get status server
   * @access Public
   */
  @route('get', '/')
  @handleError()
  async show(req: ICustomRequest): Promise<express.Response<unknown>> {
    const { callId, resHandler: res } = req;

    return resHandler(res, ERROR_CODES.OK, callId, {
      message: 'The server is up and running.'
    });
  }
}
