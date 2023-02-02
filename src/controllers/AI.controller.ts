import express from 'express';

import { ICustomRequest } from '../utils';
import { handleError, protectedRoute } from '../decorators';
import { Routable } from '../routes/routable';
import AI from '../openai';

// noinspection JSUnusedGlobalSymbols
export class AIController extends Routable {
  constructor() {
    super('/ai');
  }

  @protectedRoute('post', '/')
  @handleError()
  async create(req: ICustomRequest): Promise<express.Response<unknown>> {
    const {
      resHandler: res,
      user,
      body: { prompt }
    } = req;
    const models = await AI.listModels();
    // const completion = await AI.createCompletion(prompt);

    return res.ok(models);
  }
}
