import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, 'secretkey'); // Replace 'secretkey' with an environment variable
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};