import jwt from 'jsonwebtoken';
import process from 'node:process';

export const generateAccessToken = (p) => jwt.sign(p, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
export const generateRefreshToken = (p) => jwt.sign(p, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return Boolean(decoded);
  } catch (error) {
    return false;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return Boolean(decoded);
  } catch (error) {
    return false;
  }
};
