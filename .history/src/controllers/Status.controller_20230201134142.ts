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
import { User } from '../models';

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

    const user = await User.create({
      name: 'David Sellam',
      email: 'dvdsellam@gmail.com'
    });
    //   const newAccess = {
    //       access_id:
    // access_key:
    // secret:
    // user_id?:
    //   }
    //   await Access.create({ac})

    return resHandler(res, ERROR_CODES.OK, callId, {
      message: 'The server is up and running.'
    });
  }
}
