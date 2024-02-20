import { Buffer } from 'node:buffer';

export async function parseBody(req) {
  const buffs = [];
  for await (const chunk of req) buffs.push(chunk);
  return JSON.parse(Buffer.concat(buffs).toString());
}
