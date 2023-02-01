import express from 'express';

import { ERROR_CODES, ICustomRequest } from '../utils';

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
  function (
    req: ICustomRequest,
    res: express.Response,
    next: express.NextFunction
  ): unknown {
    const { resHandler } = req;
    if (!req.access) {
      return resHandler.wrongToken();
    }

    next();
  }
];
