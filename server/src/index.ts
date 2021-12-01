require("dotenv").config();

import express, {Application} from "express";
import {ApolloServer} from 'apollo-server-express';
import {connectDatabase} from "./database";
import { typeDefs, resolvers } from "./graphql";
import cors from 'cors'

const mount = async (app: Application) => {
    
    const db = await connectDatabase();

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: () => ({ db })
    });

    server.start().then( res => {
        server.applyMiddleware({app, path: '/api'});
        
        app.use(cors);
        
        app.listen(process.env.PORT), () =>
            console.log('Now browse to http://localhost:${process.env.PORT}');
    });

};


mount(express());