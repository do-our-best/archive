const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const postSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    hit: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Post', postSchema);