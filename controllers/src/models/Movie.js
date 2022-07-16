const mongoose = require('mongoose')
const { Schema } = mongoose;

const MovieSchema = new Schema({
    id: { type: Number, required: true },
    list: { type: String, required: true },
    title: { type: String, required: true},
    movie: { type: Object, required: true },
    date: {type: Date, default: Date.now},
    user: { type: String, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema)

