const { GraphQLScalarType } =  require('graphql');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');
const { BlogArticle } = require('./models');

const resolvers = {
    Query: {
        totalUsers: (parent, args, { db }) => {
            return db.collection('users').estimatedDocumentCount();
        },
        allUsers: (parent, args, { db }) => {
            return db.collection('users').find().toArray();
        },
        totalShelters: (parent, args, { db }) => {
            return db.collection('shelters').estimatedDocumentCount();
        },
        allShelters: (parent, args, { db }) => {
            return db.collection('shelters').find().toArray();
        },
        blogArticles: (parent, args, { db }) => {
            return BlogArticle.find({shelter_id: args.shelter_id});
        }
    },
    Mutation: {
        postShelter: (parent, args, { db }) => {
            const newShelter = {
                created_at: new Date(),
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            };
            if (!newShelter.id) {
                newShelter.id = uuidv1();
            }
            db.collection('shelters').replaceOne({id: newShelter.id}, newShelter, {upsert: true});
            return newShelter;
        },
        signIn: async (parent, args, { db }) => {
            const user = await db.collection('users').findOne({email: args.input.email});
            console.log(user);
            if (!user || !await bcrypt.compare(args.input.password, user.password)) {
                throw new Error('Email or Password is incorrect');
            }
            return '123';
        },
        signUp: async (parent, args, { db }) => {
            const user = await db.collection('users').findOne({email: args.input.email});
            console.log(user);
            if (user) {
                throw new Error('Email already registered');
            }
            const newPassword = await bcrypt.hash(args.input.password, 10);
            const newUser = {
                ...args.input,
                created_at: new Date(),
                password: newPassword
            };
            if (!newUser.id) {
                newUser.id = uuidv1();
            }
            db.collection('users').insertOne(newUser);
            return '123';
        },
        postBlogArticle: async (parent, args) => {
            const article = new BlogArticle({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await article.save();
        }
    },
    Shelter: {
        posted_by: (parent, args, { db }) => {
            return db.collection('users').findOne({id: parent.user_id});
        },
        blog_articles: (parent, args, { db }) => {
            return BlogArticle.find({shelter_id: parent.id});
        }
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'Valid timestamp',
        parseValue: (value) => new Date(value),
        serialize: (value) => new Date(value).toISOString(),
        parseLiteral: (ast) => ast.value
    })
};

module.exports = resolvers;
