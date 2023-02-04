
import { Tweet, User } from './types';
import sqlite3 from "sqlite3";
import { Model, InferAttributes, InferCreationAttributes, Sequelize, DataTypes} from 'sequelize';

const tweetData : Tweet[] = [
    {sender: 1, timestamp: new Date("2022-03-17T23:16:40Z"), message: "I can pass the turing test perfectly"},
    {sender: 1, timestamp: new Date("2022-03-19T08:54:17Z"), message: "beep beep beep"},
    {sender: 2, timestamp: new Date("2022-02-17T15:43:08Z"), message: "C is for cookie!"},
    {sender: 2, timestamp: new Date("2022-03-19T08:54:17Z"), message: "Cookies!!!"},
    {sender: 2, timestamp: new Date("2022-04-01T20:37:30Z"), message: "Om nom nom nom!!!"},
    {sender: 3, timestamp: new Date("2022-03-24T07:12:54Z"), message: "We're no stranger's to love"},
    {sender: 3, timestamp: new Date("2022-03-24T07:13:54Z"), message: "You know the rules, and so do I"},
    {sender: 3, timestamp: new Date("2022-03-24T07:14:54Z"), message: "Full commitment is what I'm thinking of"},
    {sender: 3, timestamp: new Date("2022-03-24T07:15:54Z"), message: "You wouldn't get this far with any other guy"},
    {sender: 1, timestamp: new Date("2022-03-10T02:00:00Z"), message: "I am totally not a robot"},
];

const userData : User[] = [
    {id: 1, username: "MrRoboto", password: "12345"},
    {id: 2, username: "Cookie_Monster", password: "12345"},
    {id: 3, username: "RickAstley", password: "12345"},
]

const twitterCloneDatabase = new Sequelize({
  dialect: "sqlite",
  storage: "twitter.db",
});

export interface MTweet
  extends Model<InferAttributes<MTweet>, InferCreationAttributes<MTweet>>,
    Tweet {}
export interface MUser
  extends Model<InferAttributes<MUser>, InferCreationAttributes<MUser>>,
    User {}

const TweetModel = twitterCloneDatabase.define<MTweet>(
  "Tweet",
  {
    sender: DataTypes.INTEGER,
    timestamp: DataTypes.INTEGER,
    message: DataTypes.STRING, // message is a column with a string datatype
  },
  {
    freezeTableName: true, // explained above
    timestamps: false, // explained above
  }
);

const UsersModel = twitterCloneDatabase.define<MUser>(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export async function createTweet(Tweet: Tweet): Promise<Tweet> {
  await TweetModel.sync();
  const createdTweet = await TweetModel.create({
    sender: Tweet.sender,
    timestamp: Tweet.timestamp,
    message: Tweet.message,
  });
  return createdTweet.get({ plain: true });
}

export async function getAllTweets(): Promise<Tweet[]> {
  return TweetModel.findAll({ raw: true });
}

export async function getUserByUsername(
  username: string
): Promise<User[] | undefined> {
  return UsersModel.findAll({
    where: {
      username: username,
    },
    raw: true,
  });
}
export async function getTweetsByUsername(
  username: string
): Promise<Tweet[] | undefined> {
  const users = await getUserByUsername(username);
  const firstuser = users?.at(0);
  const firstuserid = firstuser?.id;

  if (firstuserid == null || firstuser == undefined) {
    return undefined;
  }

  return TweetModel.findAll({
    where: {
      sender: firstuserid,
    },
    raw: true,
  });
}

async function main() {
  await TweetModel.sync({ force: true }); // force means nuke the table and start fresh
  await UsersModel.sync({ force: true });

  tweetData.forEach(async (tweet) => {
    let t = await TweetModel.create(tweet);
    await t.save();
  });

  userData.forEach(async (user) => {
    let u = await UsersModel.create(user);
    await u.save();
  });

  const tweets = await TweetModel.findAll();
  tweets.forEach((p) => console.log(`${p.sender} ${p.timestamp} ${p.message}`));

  const users = await UsersModel.findAll();
  users.forEach((u) => console.log(`${u.id} ${u.username}`));
}

main();