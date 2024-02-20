import http from 'node:http';
import { generateTokenPair } from './routes/generate-pair.js';
import { verifyToken } from './routes/verify-token.js';

const controllers = new Map([
  ['/generate-pair', generateTokenPair],
  ['/verify-token', verifyToken],
]);

const server = http.createServer(async (req, res) => {
  // use json for each response
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, `http://${req.headers.host}/`);
  const handler = controllers.get(url.pathname);

  if (!handler) {
    res.statusCode = 404;
    return res.end({ statusText: 'Failure', error: 'Route not found' });
  }

  await handler(req, res);
});

server.listen(44991);
