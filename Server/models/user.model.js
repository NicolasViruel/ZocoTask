const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 4,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
}, {
    timestamps: true
})

module.exports = mongoose.model('UsersZoco', UserSchema)