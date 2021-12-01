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
exports.userResolvers = void 0;
exports.userResolvers = {
    Query: {
        users: (_root, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db.users.find({}).toArray();
        })
    },
    Mutation: {
        createUser: (_root, { userName, firstName, lastName }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = yield db.users.insertOne({ userName, firstName, lastName }, function (err, info) {
                if (err) {
                    console.log("User not inserted successfully!");
                    return null;
                }
            });
            return newUser;
        })
    },
    User: {
        id: (user) => user._id.toString()
    }
};
