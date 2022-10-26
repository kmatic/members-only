const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now},
    user: { type: Schema.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema);