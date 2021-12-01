
import {Collection, ObjectId} from 'mongodb';

export interface User {
    _id: ObjectId;
    userName: string;
    firstName: string;
    lastName: string;
}

export interface Tweet {
    _id: ObjectId;
    tweet: string;
    authorId: ObjectId;
    createdAt: any;
}

export interface Follower {
    _id: ObjectId;
    follower: ObjectId;
    following: ObjectId;
}

export interface Database {
    users: Collection<User>;
    tweets: Collection<Tweet>;
    followers: Collection<Follower>
}