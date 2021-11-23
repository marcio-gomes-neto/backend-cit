import express from "express";
import setupMiddlewares from "./config/middlewares";
import router from "./config/router";

const app = express();
const defaultRoute = express.Router()

setupMiddlewares(app)

app.use('/api', router)

export default app
