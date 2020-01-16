var Musica = require('../models/musica');

var musicasController = module.exports

module.exports.listBy = (params) => {

    var selection = {};
    var projection = {};

    if (params['compositor']) {
        selection['compositor'] = params['compositor']

    } else if (params['instrumento']) {
        selection['instrumentos.instrumento.designacao'] = params['instrumento']

    } else {
        projection['_id'] = 0
        projection['-id'] = 1
        projection['titulo'] = 1
        projection['tipo'] = 1
        projection['compositor'] = 1
        
    }

    return Musica
        .find(selection, projection)
        .exec()
}


module.exports.consult = (id) => {
    return Musica
        .find({ '-id': id })
        .exec()
}



module.exports.listTypes = () => {
    return Musica
        .distinct("tipo")
        .exec()
}


module.exports.listObrasQuant = () => {


    return Musica
        .aggregate()
        .project({
            "_id": 0,
            "-id": 1,
            titulo: 1,
            nrPartituras: {
                $cond: {
                    if: { $isArray: "$instrumentos.instrumento"},
                    then: { $size: "$instrumentos.instrumento"},
                    else: 1
                }
            }
        })
        .exec()
}