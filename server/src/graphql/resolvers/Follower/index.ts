import { ObjectId } from "mongodb";
import { Database, Follower } from "../../../lib/types";

export const followerResolvers = {
 
    Query: {
        followers: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database } ): Promise<Follower[]> => {
                return await db.followers.find({}).toArray();
        },
        follower: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database } ) => {
                return await db.followers.findOne(new ObjectId(id))
        },
        userFollowers: async (
            _root: undefined,
            { id } : {id : string },
            { db }: { db: Database } ): Promise<Follower[]> => {
                return await db.followers.find({ followingId : new ObjectId(id) }).toArray();
        },      
    },
    Mutation: {
        createFollower: async (
            _root: undefined, 
            { followerId, followingId }: {followerId: string, followingId: string}, 
            { db }: {db: Database } ) => {

            const newFollower = await db.followers.insertOne(
                {followerId: new ObjectId(followerId), followingId: new ObjectId(followingId)}, 
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
        id: (follower: Follower): string  => follower._id.toString(),
        // followingId: (follower: Follower): string => follower.followingId.toString(),
        // followerId: (follower: Follower): string => follower.followerId.toString(),
    }   
};