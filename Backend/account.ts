import { DataTypes, Sequelize } from "sequelize";
import { User, Tweet } from "./types";
import * as bcrypt  from "bcrypt";
import { Request, Response } from "express";
import { createTweet } from "./fake-data-adaptor";
import { createImportSpecifier } from "typescript";


const sequelize = createDb();

const UserModel = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: false,
    timestamps: false
});

export async function createUser(user: User): Promise<User> {
    await UserModel.sync();
    const createdUser = await UserModel.create({ 
        username: user.username, 
        password: bcrypt.hashSync(user.password, 10)
    });
    return createdUser.get({ plain: true });
}


export async function getUserByUsername(username: string): Promise<User | null> { 
    await UserModel.sync();
    const foundUser = await UserModel.findOne({
        where: {
            username
        },
    });
    return foundUser?.get({plain: true});
}

export function createDb() {
    const sequelize = new Sequelize({
        dialect: "sqlite",   // type of database we're using
        storage: "users.db" // name of the db file
    });
    return sequelize;
}

export async function registerUser(user: User): Promise<User> {
    try {
        const foundUser = await getUserByUsername(user.username);
        if (foundUser) {
            return Promise.reject("This username already exists");
        }
        return await createUser(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function login(request: Request): Promise<string> {
    try {
        const user : User = request.body;
        const foundUser = await getUserByUsername(user.username);
        if (foundUser) {
            if (bcrypt.compareSync(user.password, foundUser.password)) {
                request.session.user = foundUser;
                return Promise.resolve("Login succeeded");
            }
        }
        return Promise.reject("Login failed");
    } catch (error) {
        return Promise.reject(error);
    }
}
//Debug this, data is not shown.
export async function createTweets(request: Request): Promise<Tweet | null>  {
    const user = request.session.user;
    console.log(user);
    if(user) {
        const username = user.username;
        const foundUser = await getUserByUsername(username);
        if(foundUser) {
            const sender = foundUser?.id;
            const message = request.body;
            const timestamp = new Date();
            const tweet: Tweet = {sender, message, timestamp};
            return createTweet(tweet);    
        }
    }   
    return Promise.reject(null);
}

export async function handleRegistrationRequest(request: Request, response: Response) {
    const data = request.body;
    console.log(data);
    data.id = Math.floor(Math.random()*10000000);
    try {
        const registeredUser = await registerUser(data as User);
        return response.status(200).json({
            username: registeredUser.username,
        });
    } catch(error) {
        return response.status(400).json({
            message: error,
        });
    }
}

export async function handleLoginRequest(request: Request, response: Response) {
    try {
        const responseMessage = await login(request);
        return response.status(200).json({message: responseMessage});
    } catch (error) {
        return response.status(401).json({error: error});
    }
}

export async function handleCreateTweetRequest(request: Request, response: Response) {
    try {
        const responseMessage = await createTweets(request);
        return response.status(200).json({message: responseMessage});
    } catch (error) {
        return response.status(401).json({error: error});
    }
}

// this is needed to get request.session.user to work
declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}
