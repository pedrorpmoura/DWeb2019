const mongoose = require('mongoose');

var prizeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    year: { type: String, required: true },
    category: { type: String, required: true },
    overallMotivation: String, 
    laureates: { type: [laureateSchema], required: true }
});

var laureateSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstname: { type: String, required: true },
    surname: { type: String, required: true },
    motivation: { type: String, required: true },
    share: { type: String, required: true }
});

module.exports = mongoose.model('Prize', prizeSchema);