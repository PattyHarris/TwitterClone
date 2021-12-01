"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetResolvers = void 0;
const mongodb_1 = require("mongodb");
const graphql_scalars_1 = require("graphql-scalars");
exports.tweetResolvers = {
    DateTime: graphql_scalars_1.GraphQLDateTime,
    Query: {
        tweets: (_root, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db.tweets.find({}).toArray();
        })
    },
    Mutation: {
        createTweet: (_root, { authorId, tweet }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const newTweet = yield db.tweets.insertOne({ authorId: new mongodb_1.ObjectId(authorId), tweet, createdAt: today }, function (err, info) {
                if (err) {
                    console.log("Tweet not inserted successfully!");
                    return null;
                }
            });
            return newTweet;
        })
    },
    Tweet: {
        id: (tweet) => tweet._id.toString()
    }
};
