const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');

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

const PetScheme = new Schema(
    {
        id: String,
        user_id: String,
        name: String,
        shelter_id: String,
        picture: String,
        gender: {
            type: String,
            enum: ['unknown', 'male', 'female'],
            default: 'unknown'
        },
        age: { // in months
            type: Number,
            default: 0
        }
    }
);
PetScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    if (!this.gender) {
        this.gender = 'unknown';
    }
    next();
});
const Pet = mongoose.model('Pet', PetScheme);

module.exports = { Shelter, Pet };
