const mongoose = require('mongoose');

const User = new mongoose.Schema({ //! added mongoose and changed user to userSchema
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, //! removed s
        required: true
    }
});

module.exports = mongoose.model('User', User);