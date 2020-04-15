import { Router } from "express";
import { FeedRouter } from "./feed.router";

const router = Router();

router.use('/feed', FeedRouter);

export const IndexRouter = router;