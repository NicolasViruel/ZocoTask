const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersZoco',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TasksZoco', TaskSchema);