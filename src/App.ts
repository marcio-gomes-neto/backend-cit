import express from "express";
import setupMiddlewares from "./config/middlewares";
import router from "./config/router";
import dotenv from 'dotenv'

const app = express();

dotenv.config()
setupMiddlewares(app)

app.use('/api', router)

export default app
