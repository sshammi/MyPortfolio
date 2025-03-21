/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const auth = (role:string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //console.log("passing role",role);
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }
    let decoded;
    try {
       decoded= jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
      
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED,'Unauthorized')
    }
    //console.log(decoded.role);
    if (decoded.role !== role) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'Access denied.'
        );
      }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;