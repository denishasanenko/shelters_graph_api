const mongoose = require('./db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');

const BlogArticleScheme = new Schema(
    {
        id: String,
        user_id: String,
        shelter_id: String,
        title: String,
        article: String
    }
);
BlogArticleScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const BlogArticle = mongoose.model('BlogArticle', BlogArticleScheme);

const ShelterScheme = new Schema(
    {
        id: String,
        user_id: String,
        name: String,
        description: String,
        category: String
    }
);
ShelterScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const Shelter = mongoose.model('Shelter', ShelterScheme);

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

module.exports = {
    BlogArticle,
    Shelter,
    User
};
