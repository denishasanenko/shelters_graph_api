const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');

const UserScheme = new Schema(
    {
        id: String,
        email: String,
        password: String
    }
);
UserScheme.path('password').set(function (password) {
    return bcrypt.hashSync(password, 10);
});
UserScheme.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
UserScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const User = mongoose.model('User', UserScheme);

module.exports = User;
