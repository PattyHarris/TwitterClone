import { Db, ObjectId } from "mongodb";
import { Database, Tweet, User } from "../../../lib/types";
import { GraphQLDateTime } from 'graphql-scalars';

export const tweetResolvers = {

    DateTime: GraphQLDateTime,

    Query: {
        tweets: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database } ): Promise<Tweet[]> => {
                return await db.tweets.find({}).toArray();
        },
        tweet: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database } ) => {
                return await db.tweets.findOne(new ObjectId(id))
        },
    },
    Mutation: {
        createTweet: async (
            _root: undefined, 
            { authorId, tweet }: {authorId: string, tweet: string }, 
            { db }: {db: Database } ) => {

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);

            const newTweet = await db.tweets.insertOne(
                { authorId: new ObjectId(authorId), tweet, createdAt: today }, 
                function(err, info) {
                    if (err) {
                    console.log("Tweet not inserted successfully!");
                    return null;
                }
                
            })

            return newTweet;
        }
    },
    Tweet: {
        id: (tweet: Tweet): string  => tweet._id.toString(),

        author: async (tweet: Tweet, 
                       { id }: { id: string }, 
                       { db }: { db: Database }  ) : Promise<User | null> => {
                return await db.users.findOne(tweet.authorId);
        }
    }   
};