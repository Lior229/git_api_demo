import express, { Request, Response, NextFunction } from 'express';
import { generateToken } from "../utils/jwtAuth";
const router = express.Router();

router.post('/auth/login', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = generateToken()
        response.json(token);
    } catch (err: any) {
        next(err);
    }
})














export default router;