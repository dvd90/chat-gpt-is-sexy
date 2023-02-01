import express from 'express';
import { Access, User, IUser } from '../models';

import { IAuthHeader, ICustomRequest } from '../utils';
import { createHmac } from 'crypto';

export function createTokenAndCheckToken(
  token: string,
  secret: string,
  timestamp: string,
  access_id: string
): boolean {
  const checkToken = createHmac('sha256', secret)
    .update(timestamp + '.' + access_id)
    .digest('base64');

  return checkToken === token;
}

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

    if (
      access ||
      !createTokenAndCheckToken(
        headers['x-signed'],
        access.secret,
        headers['x-timestamp'].toString(),
        access.access_id
      )
    ) {
      return resHandler.wrongToken();
    }

    // TODO: Expiration
    // const expirationDate = Helpers.dateAfterDays(1, timestamp);
    // if (!Helpers.isBefore(expirationDate)) {
    //   return errResHandler(
    //     res,
    //     req,
    //     ERROR_CODES.TOKEN_EXPIRED,
    //     'err in authMiddleware',
    //     'src/middleware/authentication',
    //     req.callId
    //   );
    // }

    let user: IUser | undefined;

    if (access.user_id) {
      user = await User.findOne({ user_id: access.user_id });
    }

    req.user = user;
    req.access = access;

    next();
  }
];
