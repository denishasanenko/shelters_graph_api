const User = require('./models');

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
            return '123';
        },
        signUp: async (parent, args) => {
            const user = await User.findOne({email: args.input.email});
            if (user) {
                throw new Error('Email already registered');
            }
            const newUser = new User({
                ...args.input
            });
            await newUser.save();
            return '123';
        }
    }
};

module.exports = resolvers;
