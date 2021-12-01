import { MongoClient } from "mongodb";
import { Database } from '../lib/types';

const url = "mongodb://localhost:27017/twitter-clone";


export const connectDatabase = async (): Promise<Database> => {
    const client = await MongoClient.connect(url);

     const db = client.db('twitter-clone');

     return {
         users: db.collection('users'),
         tweets: db.collection('tweets'),
         followers: db.collection('followers')
     };
     
};