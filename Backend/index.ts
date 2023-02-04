// import the express variable from the expression package, which
// is a dependency we included in our project in package.json

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { Request, Response } from "express";
import session from 'express-session';
import { handleRegistrationRequest, handleLoginRequest, handleCreateTweetRequest } from './account';

// import these 2 variables from fake-data-adaptor.ts
import {getAllTweets, getTweetsByUsername} from "./fake-data-adaptor";

// create an express server app
const app = express();

app.use(express.json());
//routes 
app.use(cors());
app.use(session({
    secret: "very very secure password ",
}));
app.get('/json', async (req, res) => {
    console.log(`received request to ${req.originalUrl}`);
    res.send(await getAllTweets());
})

app.get('/json/:username', async (req, res) => {
    console.log(`received request to ${req.originalUrl}`);
    const username = req.params.username;
    res.send(await getTweetsByUsername(username));
})

app.get('/tweets', async (request: Request, response: Response) => {
    response.send(await getAllTweets());
})

app.post("/register", handleRegistrationRequest);
app.post("/login", handleLoginRequest);
app.post("/createTweet", handleCreateTweetRequest); 
const port = 12345;
console.log(`starting web server on port ${port}`);

app.listen(port);
