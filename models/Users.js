const mongoose = require('mongoose');
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email!`,
        },
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: isStrongPassword,
            message: props => `Password is not strong enough`,
        },
    },

    confirmPassword:{
        type: String,
        trim: true,
        required: true,
    },

    profileImage: {
        type: String,
        trim: true,
        default: null,
    },
    Rules: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rules',
    },
    language: {
        type: String,
        required: true,
        default: 'en-US',
        enum: ['en-US', 'ar-arabic'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 7,
    },

    chosenProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopOwnerProfile',
    }

}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);
