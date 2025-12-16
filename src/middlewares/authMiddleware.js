import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.JWT_SECRET;

// Middleware to protect routes
export function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify the token
    const verified = verify(token.split(' ')[1], secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
}