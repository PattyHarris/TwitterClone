import {gql } from "apollo-server-express";

export const typeDefs = gql`
    
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
        user(id: ID!) : User
        tweets: [Tweet!]!
        followers: [Follower!]!
    }

    type Mutation {
        createUser(userName: String!, firstName: String!, lastName: String!) : User
        createTweet(authorId: ID!, tweet: String!) : Tweet
        createFollower(follower: ID!, following: ID!) : Follower
    }

`

;