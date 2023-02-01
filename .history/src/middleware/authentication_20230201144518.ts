import express from 'express';
import { Access } from '../models';

import { IAuthHeader, ICustomRequest } from '../utils';

// Auth with Auth0
// const authJWT = expressjwt({
//   secret: expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 10,
//     jwksUri: `https://${auth0Vars.domain}/.well-known/jwks.json`
//   }),
//   audience: auth0Vars.audience,
//   issuer: `https://${auth0Vars.domain}/`,
//   algorithms: ['RS256'],
//   requestProperty: 'user'
// });

export const authMiddleware = [
  async function (
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): Promise<unknown> {
    const { resHandler } = req;
    const headers = req.headers as IAuthHeader;

    const access = headers['x-key']
      ? await Access.findOne({ access_key: headers['x-key'] })
      : undefined;

    if (.access) {
      return resHandler.wrongToken();
    }

    next();
  }
];
