import express from "express";
import bodyParser from "body-parser";
import config from "./Config/config.js";
import router from "./Config/router.js";
import { connect } from "./Config/database.js";
import cors from "cors";

const app = express();
connect(config['database']);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(`${config['contextRoot']}`, router(app));

app.listen(config['port'], () => {
    console.log(`Server started at port ${config['port']}`);
});