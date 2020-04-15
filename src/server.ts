import express from "express";
import bodyParser from "body-parser";
import { IndexRouter } from "./controllers/v0/routes";
import { sequelize } from "./sequelize";
import { V0MODEL } from "./controllers/v0/models";



(async()=> {
    await sequelize.addModels(V0MODEL);
    // await sequelize.sync();

    const app =  express();

    app.use(bodyParser.json());

    const port = process.env.PORT || 8001; // default port to listen

    //CORS Should be restricted
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    app.use('/api/v0/', IndexRouter);

    app.get('/', (req, res) => {
        res.send('/api/v0/');
    });

    app.listen(port, () => {
        console.log( `server running http://localhost:${ port }` );
        console.log( `press CTRL+C to stop server` );
    });
})();