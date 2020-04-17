import { Router, Request, Response } from "express";
import { FeedItem } from "../models/Feed";
import { getGetSignedUrl } from "../../../aws";

const router : Router = Router();

router.get('/', async(req:Request, res:Response) => {
    const feedItems = await FeedItem.findAll();
    feedItems.forEach(item => {
        item.url = getGetSignedUrl(item.url);
    });
    res.status(200).send(feedItems);
});

router.get('/:id', async(req:Request, res:Response) => {
    const {id} = req.params;

    const item = await FeedItem.findByPk(id);
    if(item){
        item.url = getGetSignedUrl(item.url);
        res.status(200).send(item);
    }
    res.status(404).send(item);

});

export const FeedRouter: Router = router;