const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { readFileSync } = require('fs');
const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
require('dotenv').config();
const resolvers = require('./resolvers');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome'));

app.listen({port: process.env.APP_PORT}, () => {
    console.log(`App listen on port ${process.env.APP_PORT}} by ${server.graphqlPath}`)
});
