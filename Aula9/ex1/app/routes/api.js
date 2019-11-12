var express = require('express');
var router = express.Router();

var ObrasController = require('../controllers/obras')

router.get('/obras', function(req, res, next) {
    
    const params = req.query;
    ObrasController.listBy(params)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

router.get('/obras/:id', function(req, res, next) {

    const id = req.params.id;
    ObrasController.consult(id)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

router.get('/compositores', function(req, res, next) {

    ObrasController.compositores()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

router.get('/periodos', function(req, res, next) {

    ObrasController.periodos()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

module.exports = router;
