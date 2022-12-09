// import the express variable from the expression package, which
// is a dependency we included in our project in package.json

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { Request, Response } from "express";
import session from 'express-session';
import { handleRegistrationRequest, handleLoginRequest } from './account';

// import these 2 variables from fake-data-adaptor.ts
import {getAllTweets, getTweetsByUsername} from "./fake-data-adaptor";

// create an express server app
const app = express();

app.use(express.json());
//routes 
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(path.resolve('./html/index.html'));
});

app.use(session({
    secret: "very very secure password ",
}));

app.use("/login", express.static("./html/login.html"));
app.use("/register", express.static("./html/register.html"));
app.use("/client", express.static('./out/client'));
app.use("/html", express.static('./html'));
app.use("/icons", express.static('./icons'));


// Define a lambda to handle a GET request to route '/' on our server.
// Note that the lambda takes in 2 inputs. They are the request and the response objects


app.get('/json', async (req, res) => {
    console.log(`received request to ${req.originalUrl}`);
    res.send(await getAllTweets());
})

app.get('/json/:username', async (req, res) => {
    console.log(`received request to ${req.originalUrl}`);
    const username = req.params.username;
    res.send(await getTweetsByUsername(username));
})

app.post('/tweets', (request: Request, response: Response) => {
    const data = request.body;
    const newDate = new Date().valueOf();
    console.log(data);
    // code to save post
    return response.status(200).json(data); // return a 200 (OK) response with the `data` in the response body
})
app.post("/register", handleRegistrationRequest);
app.post("/login", handleLoginRequest);

app.use("/:username", express.static("./html/index.html"));

const port = 12345;
console.log(`starting web server on port ${port}`);

app.listen(port);
