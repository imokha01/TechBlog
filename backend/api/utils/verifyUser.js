import jwt from 'jsonwebtoken';
import{ errorHandler } from './error.js';

// 
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  //! if no token, return 401 unauthorized status
  if (!token) {
    return next(errorHandler(401,' Unauthorized'));
  }

  //! verify token against the current secret token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401,' Unauthorized'));
    }
    req.user = user;
    next();
  });
}