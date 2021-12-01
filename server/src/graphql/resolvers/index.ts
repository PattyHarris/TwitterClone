import merge from 'lodash.merge';
import { userResolvers } from './User';
import { tweetResolvers } from './Tweet';

export const resolvers = merge(userResolvers, tweetResolvers);