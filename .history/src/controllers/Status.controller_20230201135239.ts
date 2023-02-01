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
import { User, Access } from '../models';

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

    await Access.create({ user_id: '2920ceba-f9c5-41fb-9452-4acce612ee16' });
  }
}
