import express from 'express';

import {
  // AgendaJob,
  // errCatchResHandler,
  ERROR_CODES,
  ICustomRequest,
  resHandler
} from '../utils';
import { handleError, route } from '../decorators';
import { Routable } from '../routes/routable';
import { Access } from '../models';

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
  async show(
    req: ICustomRequest,
    res: express.Response
  ): Promise<express.Response<unknown>> {
    const { callId } = req;

    const newAccess = {
        access_id: string;
  access_key: string;
  secret: string;
  user_id?: string;
    }
    await Access.create({ac})

    return resHandler(res, ERROR_CODES.OK, callId, {
      message: 'The server is up and running.'
    });
  }
}
