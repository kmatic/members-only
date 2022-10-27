const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const postSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now},
    user: { type: Schema.ObjectId, ref: 'User' }
})

postSchema.virtual('date').get(function () {
    return DateTime.fromJSDate(this.timestamp).toFormat('yyyy-MM-dd, HH:mm');
})

module.exports = mongoose.model('Post', postSchema);