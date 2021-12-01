import { ObjectId } from "mongodb";
import { Database, Follower } from "../../../lib/types";

export const followerResolvers = {
 
    Query: {
        followers: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database } ): Promise<Follower[]> => {
                return await db.followers.find({}).toArray();
        }
    },
    Mutation: {
        createFollower: async (
            _root: undefined, 
            { follower, following }: {follower: string, following: string}, 
            { db }: {db: Database } ) => {

            const newFollower = await db.followers.insertOne(
                {follower: new ObjectId(follower), following: new ObjectId(following)}, 
                function(err, info) {
                    if (err) {
                    console.log("Follower not inserted successfully!");
                    return null;
                }
                
            })

            return newFollower;
        }
    },
    Follower: {
        id: (follower: Follower): string  => follower._id.toString()
    }   
};