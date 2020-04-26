const { ApolloServer } = require('apollo-server-express');
const express = require('express');
require('dotenv').config();

let typeDefs = [
    require('./src/base/typedefs'),
    require('./src/users/typedefs'),
    require('./src/articles/typedefs'),
    require('./src/shelters/typedefs')
];

resolvers = [
    require('./src/base/resolvers'),
    require('./src/users/resolvers'),
    require('./src/shelters/resolvers'),
    require('./src/articles/resolvers')
];

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
