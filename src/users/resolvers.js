const User = require('./models');
const jwt = require('jsonwebtoken');

const resolvers = {
    Query: {
        totalUsers: async () => {
            return await User.count();
        },
        allUsers: async () => {
            return await User.find();
        }
    },
    Mutation: {
        signIn: async (parent, args) => {
            const user = await User.findOne({email: args.input.email});
            if (!user || !user.comparePassword(args.input.password)) {
                throw new Error('Email or Password is incorrect');
            }
            return jwt.sign({email: user.email, id: user.id}, 'secret', {'expiresIn': '1h'});
        },
        signUp: async (parent, args) => {
            const user = await User.findOne({email: args.input.email});
            if (user) {
                throw new Error('Email already registered');
            }
            const newUser = new User({
                ...args.input
            });
            const savedUser = await newUser.save();
            return jwt.sign({email: savedUser.email, id: savedUser.id}, 'secret', {'expiresIn': '1h'});
        }
    }
};

module.exports = resolvers;
