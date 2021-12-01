"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
    
    scalar DateTime

    type User {
        id: ID!
        userName: String!
        firstName: String!
        lastName: String!
    }

    type Tweet {
        id: ID!
        tweet: String!
        authorId: ID!
        createdAt: DateTime!
    }

    type Follower {
        id: ID!
        follower: ID!
        following: ID!
    }

    type Query {
        users: [User!]!
        tweets: [Tweet!]!
        followers: [Follower!]!
    }

    type Mutation {
        createUser(userName: String!, firstName: String!, lastName: String!) : User
        createTweet(authorId: ID!, tweet: String!) : Tweet
        createFollower(follower: ID!, following: ID!)
    }

`;
