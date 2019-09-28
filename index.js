const { ApolloServer, gql } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const express = require('express');
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
const resolvers = require('./resolvers');
require('dotenv').config();

async function start() {
    const app = express();
    const MONGO_DB = process.env.DB_HOST;
    const client = await MongoClient.connect(
        MONGO_DB,
        { useNewUrlParser: true }
    );
    const db = client.db();
    const context = { db };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context
    });

    server.applyMiddleware({ app });

    app.get('/', (req, res) => res.end('Welcome'));

    app.listen({port: 4000}, () => {
        console.log(`App listen on port 4000 by ${server.graphqlPath}`)
    });
}

start();
