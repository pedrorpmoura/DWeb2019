var Obra = require('../models/obra');

var obrasController = module.exports

/**
 * Devolve a lista de obras do dataset
 */
module.exports.listBy = (params) => {

    var selection = {};

    if (params['compositor'] && params['duracao']) {
        selection['$and'] = [
            { 'compositor': params['compositor'] },
            { 'duracao': {$gte: params['duracao']}}
        ]

    } else if (params['ano']) {
        selection['anoCriacao'] = params['ano'];

    } else if (params['periodo']) {
        selection['periodo'] = params['periodo'];
    }

    return Obra
        .find(selection)
        .exec()
}


/**
 * Devolve a informação de uma obra
 */
module.exports.consult = (id) => {
    return Obra
        .find({ '@id': id })
        .exec()
}


/**
 * Devolve lista de compositores
 */
module.exports.compositores = () => {
    return Obra
        .aggregate([
            {$group: {_id: "$compositor"}}
        ])
        .exec()
}

/**
 * Devolve lista de periodos
 */
module.exports.periodos = () => {
    return Obra
        .aggregate([
            {$group: {_id: "$periodo"}}
        ])
        .exec()
}