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
exports.followerResolvers = void 0;
const mongodb_1 = require("mongodb");
exports.followerResolvers = {
    Query: {
        followers: (_root, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db.followers.find({}).toArray();
        })
    },
    Mutation: {
        createFollower: (_root, { follower, following }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const newFollower = yield db.followers.insertOne({ follower: new mongodb_1.ObjectId(follower), following: new mongodb_1.ObjectId(following) }, function (err, info) {
                if (err) {
                    console.log("Follower not inserted successfully!");
                    return null;
                }
            });
            return newFollower;
        })
    },
    Follower: {
        id: (follower) => follower._id.toString()
    }
};
