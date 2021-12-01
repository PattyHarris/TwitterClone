"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_merge_1 = __importDefault(require("lodash.merge"));
const User_1 = require("./User");
const Tweet_1 = require("./Tweet");
const Follower_1 = require("./Follower");
exports.resolvers = (0, lodash_merge_1.default)(User_1.userResolvers, Tweet_1.tweetResolvers, Follower_1.followerResolvers);
