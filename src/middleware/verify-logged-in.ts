import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../models/Error';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            toekn?: string;
        }
    }
}

 const verifyToken = async (request: Request, response: Response, next: NextFunction) => {
    //get the jwt from the authorization header
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
        const error = new UnauthorizedError('Unauthorized');
        next(error);
        return;
    }
    console.log('thetoken', token);
    

    // verify the jwt
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err) => {
        if (err) {
            console.log('verify error', err);
            
            // JWT is invalid, return an error response
            const error = new UnauthorizedError('Unauthorized');
            next(error);
        } else {
            // JWT is valid
            next();
        }
    })
}

export default verifyToken;