const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    info: {
        type: String,
    },
    is_admin: {
        type: Boolean,
        default: 0,
    },
});

module.exports = mongoose.model('User', userSchema);