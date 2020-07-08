const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const jwt = require('jsonwebtoken');
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

const context = ({ req }) => {
    // get the user token from the headers
    let user = {};
    const token = req.headers.authorization || '';
    const splitToken = token.split(' ')[1];
    try {
        jwt.verify(splitToken, 'secret');
        user = jwt.decode(splitToken);
    } catch (e) {

    }
    return {user};
}


const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome'));

app.listen({port: process.env.APP_PORT}, () => {
    console.log(`App listen on port ${process.env.APP_PORT}} by ${server.graphqlPath}`)
});
