import { generateAccessToken, generateRefreshToken } from '../lib/jwt.js';
import { parseBody } from '../utils.js';

export async function generateTokenPair(req, res) {
  const body = await parseBody(req);

  if (!body || !body.payload) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ statusText: 'Failure', error: 'You must provide a payload for best security practice' })
    );
  }

  const accessToken = generateAccessToken(body.payload);
  const refreshToken = generateRefreshToken(body.payload);

  res.statusCode = 200;
  res.end(JSON.stringify({ statusText: 'Success', data: { accessToken, refreshToken } }));
}
