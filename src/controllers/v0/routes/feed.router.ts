import { Router, Request, Response } from "express";
import { FeedItem } from "../models/Feed";
import { getGetSignedUrl, getPutSignedUrl } from "../../../aws";
import { NextFunction } from 'connect';
import * as jwt from 'jsonwebtoken';
import { config } from "../../../config/config";


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

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    //  return next();
       if (!req.headers || !req.headers.authorization){
           return res.status(401).send({ message: 'No authorization headers.' });
       }
       
   
       const token_bearer = req.headers.authorization.split(' ');
       if(token_bearer.length != 2){
           return res.status(401).send({ message: 'Malformed token.' });
       }
       
       const token = token_bearer[1];
       return jwt.verify(token, config.jwt.secret , (err, decoded) => {
         if (err) {
           return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
         }
         return next();
       });
   }

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    console.log(req.params);
    let { fileName } = req.params;
    const url = getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

router.post('/', async(req: Request, res:Response) => {
    const {url, caption} = req.body;
    if(!url || !caption){
        res.status(400).send("caption and url required");
    }
    // const putUrl = getPutSignedUrl(url);
    const feed = new FeedItem();
    feed.caption = caption;
    feed.url = url;
    var savedFeed : FeedItem;
    try{
        savedFeed = await feed.save();
    }catch(err) {
        res.status(400).send(err.message);
    }
    savedFeed.url = getGetSignedUrl(url);
    res.status(201).send(savedFeed);

});

export const FeedRouter: Router = router;