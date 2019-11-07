var express = require('express');
var router = express.Router();

var PrizesController = require('../controllers/prizes')

/* 
    GET: Devolve a lista de prémios apenas com os campos "year" e 
         "category"
*/
router.get('/prizes', function (req, res, next) {

    const category = req.query.category;
    const date = req.query.date;

    PrizesController.list(category, date)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json(err))
});

/*
    GET: Devolve a informação completa de um prémio
*/
router.get('/prizes/:prizeID', function (req, res, next) {

    const prizeID = req.params.prizeID;

    PrizesController.consult(prizeID)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json(err))
});

/*
    GET: Devolve a lista de categorias, sem repetições
*/
router.get('/categories', function (req, res, next) {
    
    PrizesController.categories()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json(err))
});

/* 
    GET: Devolve uma lista ordenada alfabeticamente por 
         nome dos laureados com os campos correspondentes ao 
         nome, ano do prémio e categoria 
*/
router.get('/laureates', function (req, res, next) {
    
    PrizesController.laureates()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).json(err))
}); 


module.exports = router;