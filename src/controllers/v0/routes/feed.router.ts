import { Router, Request, Response } from "express";

const router : Router = Router();

router.get('/', async(req:Request, res:Response) => {
    res.send("Welcome to feeds")
});

export const FeedRouter: Router = router;