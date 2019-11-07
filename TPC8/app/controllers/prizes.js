var Prize = require('../models/prize');

var PrizesController = module.exports

/**
 * Devolve a lista de prémios apenas com os campos
 * "year" e "category"
 */
module.exports.list = (category, year) => {
    
    var selection = {};
    if (category !== undefined) {

        if (year !== undefined) {
            selection = { category: category, year: {$gt: year} };
        } else {
            selection = { category: category }
        }
    }

    return Prize
        .find(selection, { year: true, category: true })
        .exec();
}

/**
 * Devolve a informação completa de um prémio
 */
module.exports.consult = (id) => {
    return Prize
        .find({ _id: id })
        .exec();
}

/**
 *  Devolve a lista de categorias, sem repetições
 */
module.exports.categories = () => {
    return Prize
        .distinct('category')
        .exec();
}

/**
 * Devolve uma lista ordenada alfabeticamente por 
 * nome dos laureados com os campos correspondentes ao 
 * nome, ano do prémio e categoria
 */
module.exports.laureates = () => {
    return Prize
        .aggregate(
            [
                { $unwind: '$laureates' },
                { $group: 
                    {
                        _id: '$laureates.id',
                        firstname: { $first: '$laureates.firstname' },
                        surname: { $first: '$laureates.surname' },
                        year: { $first: '$year' },
                        category: { $first: '$category' }
                    }
                }
            ]
        )
        .sort({ firstname: true, surname: true })
        .exec()
}