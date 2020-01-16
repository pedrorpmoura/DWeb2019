const mongoose = require('mongoose');


var Partitura = new mongoose.Schema({
    "-voz": String,
    "-type": String,
    "-path": String
});

var Instrumento = new mongoose.Schema({
    designacao: String,
    partitura: Partitura
});

var MusicaSchema = new mongoose.Schema({
    '-id': String,
    titulo: String,
    subtitulo: String,
    tipo: String,
    compositor: String,
    arranjo: String,
    'inf-relacionada': String,
    instrumentos: { instrumento: [Instrumento] }
});

module.exports = mongoose.model('Musica', MusicaSchema);