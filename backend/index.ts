import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';;

import { verifyToken } from "./middleware/auth-verification";
import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
console.log(1)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ['http://localhost:9999'];

app.use(
    cors(),
);

app.use(verifyToken);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use("/auth", authRouter);

// Connect to MongoDB server
(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login_system')
        console.log('Connected to database');
    } catch (err) {
        console.log('Connection to database failed. Error: ' + err); 
    }
})();

const instance = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export { app as server, instance };
