import {gql } from "apollo-server-express";

export const typeDefs = gql`
    
    scalar DateTime

    type User {
        id: ID!
        userName: String!
        firstName: String!
        lastName: String!
        tweets: [Tweet]
    }

    type Tweet {
        id: ID!
        tweet: String!
        author: User!
        createdAt: DateTime!
    }

    type Follower {
        id: ID!
        followerId: ID!
        followingId: ID!
    }

    type Query {
        users: [User!]!
        user(id: ID!) : User
        tweets: [Tweet!]!
        tweet(id: ID!) : Tweet
        followers: [Follower!]!
        follower(id: ID!) : Follower
        userFollowers(id: ID!): [Follower]
    }

    type Mutation {
        createUser(userName: String!, firstName: String!, lastName: String!) : User
        createTweet(authorId: ID!, tweet: String!) : Tweet
        createFollower(followerId: ID!, followingId: ID!) : Follower
    }

`

;