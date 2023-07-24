import express, { Request, Response, NextFunction }  from "express";
import cors from "cors";
import catchAll from "./middleware/catch-all";
import routeNotFound from "./middleware/route-not-found";
import controller from "./controllers/controller";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const server = express();

server.use(cors());
server.use(express.json())

server.use(express.static('./frontend/dist/git_api_demo/'))

server.use("/api", controller);
server.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.sendFile(path.join(__dirname, 'frontend', 'dist', 'git_api_demo', 'index.html'))
    next()
})
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`)
});