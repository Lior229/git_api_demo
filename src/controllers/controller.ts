import express, { Request, Response, NextFunction } from "express";
import { searchRepository } from "../logic/logic";
import verifyToken from "../middleware/verify-logged-in";

const router = express.Router();

// GET http://localhost:3005/api/search/:keyword
router.get("/search/:keyword",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const keyword = request.params.keyword    
        const repositories  = await searchRepository(keyword)
        response.json(repositories)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;