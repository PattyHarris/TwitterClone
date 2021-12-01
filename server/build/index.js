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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./database");
const graphql_1 = require("./graphql");
const cors_1 = __importDefault(require("cors"));
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.connectDatabase)();
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: () => ({ db })
    });
    server.start().then(res => {
        server.applyMiddleware({ app, path: '/api' });
        app.use(cors_1.default);
        app.listen(process.env.PORT), () => console.log('Now browse to http://localhost:${process.env.PORT}');
    });
});
mount((0, express_1.default)());
