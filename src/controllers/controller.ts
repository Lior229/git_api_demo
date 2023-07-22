import express, { Request, Response, NextFunction } from "express";
import { searchRepository } from "../logic/logic";
import { generateToken } from "../utils/jwtAuth";
import verifyToken from "../middleware/verify-logged-in";

const router = express.Router();

// GET http://localhost:3005/api/search/:keyword
router.get("/search/:keyword", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const keyword = request.params.keyword    
        const repositories  = await searchRepository(keyword)
        response.json(repositories)
    }
    catch (err: any) {
        next(err);
    }
});

// http://localhost:3005/api/generateToken
router.get('/generateToken', async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = generateToken()
        response.status(200).json(token);
    } catch (err: any) {
        next(err);
    }
})

export default router;