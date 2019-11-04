var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovieSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    year: Number,
    cast: [String],
    genres: [String]
})

module.exports = mongoose.model('Movie', MovieSchema)

