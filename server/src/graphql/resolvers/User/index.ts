import { ObjectId } from "mongodb";
import { Database, User } from "../../../lib/types";

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
        id: (user: User): string  => user._id.toString()
    }   
};