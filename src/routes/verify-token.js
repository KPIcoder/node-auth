import { verifyAccessToken, verifyRefreshToken } from '../lib/jwt.js';
import { parseBody } from '../utils.js';

export async function verifyToken(req, res) {
  const body = await parseBody(req);

  if (!body || (!body.accessToken && !body.refreshToken)) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ statusText: 'Failure', error: "You must provide either 'acessToken' or 'refreshToken' " })
    );
  }

  const { accessToken, refreshToken } = body;

  let isValidAccessToken = null;
  let isValidRefreshToken = null;

  if (accessToken) isValidAccessToken = verifyAccessToken(accessToken);
  if (refreshToken) isValidRefreshToken = verifyRefreshToken(refreshToken);

  res.statusCode = 200;
  res.end(JSON.stringify({ statusText: 'Success', data: { isValidAccessToken, isValidRefreshToken } }));
}
