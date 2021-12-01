import { ObjectId } from "mongodb";
import { Database, Tweet } from "../../../lib/types";
import { GraphQLDateTime } from 'graphql-scalars';

export const tweetResolvers = {

    DateTime: GraphQLDateTime,

    Query: {
        tweets: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database } ): Promise<Tweet[]> => {
                return await db.tweets.find({}).toArray();
        }
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
        id: (tweet: Tweet): string  => tweet._id.toString()
    }   
};