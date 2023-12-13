const mongoose = require('mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Strings,
        required: true
    }
});

module.exports = mongoose.model('User', User);