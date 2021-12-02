import merge from 'lodash.merge';
import { userResolvers } from './User';
import { tweetResolvers } from './Tweet';
import { followerResolvers } from './Follower';

export const resolvers = merge(userResolvers, tweetResolvers, followerResolvers);