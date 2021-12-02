import { ObjectId } from "mongodb";
import { listenerCount } from "process";
import { Database, Tweet, User, Follower } from "../../../lib/types";

export const userResolvers = {
 
    Query: {
        users: async (
            _root: undefined, 
            _args: {}, 
            { db }: { db: Database } ): Promise<User[]> => {
                return await db.users.find({}).toArray();
        },
        user: async (
            _root: undefined, 
            { id }: { id: string }, 
            { db }: { db: Database } ) => {
                return await db.users.findOne(new ObjectId(id))
        }
    },

    Mutation: {
        createUser: async (
            _root: undefined, 
            { userName, firstName, lastName }: {userName: string, 
                                                firstName: string, 
                                                lastName: string}, 
            { db }: {db: Database } ) => {

            const newUser = await db.users.insertOne(
                {userName, firstName, lastName}, 
                function(err, info) {
                    if (err) {
                    console.log("User not inserted successfully!");
                    return null;
                }
                
            })

            return newUser;
        }
    },
    User: {
        id: (user: User): string  => user._id.toString(),

        tweets: async(user: User,
            { id }: { id: string }, 
            { db }: { db: Database }  ) : Promise<Tweet[] > => {
    
                let tweetList: Tweet[];
                tweetList = await db.tweets.find( { authorId: user._id } ).toArray();

                let followersList : Follower[];
                followersList  = await db.followers.find({ followingId : 
                                                new ObjectId( user._id) }).toArray();

                console.log("Length: ", followersList.length);

                let followerTweets : Tweet[];

                for (let i = 0; i < followersList.length; i ++) {

                    followerTweets = await db.tweets.find( { 
                        authorId: followersList[i].followerId } ).toArray();
                    
                    // Concatenate the results..
                    tweetList = [...tweetList, ...followerTweets];
                }

                // Sort by most recent tweets first.
                tweetList.sort( (a,b) => (b.createdAt - a.createdAt));

                return tweetList;
            }
    }   
};

/*
    userFollowers: async (
            _root: undefined,
            { id } : {id : string },
            { db }: { db: Database } ): Promise<Follower[]> => {
                let followersList : Follower[];
                followersList  = await db.followers.find({ followingId : new ObjectId(id) }).toArray();
                return followersList;
        },  
*/