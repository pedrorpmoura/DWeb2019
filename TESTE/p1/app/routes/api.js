var express = require('express');
var router = express.Router();

var MusicasController = require('../controllers/musicas')


router.get('/obras', function(req, res, next) {

    const params = req.query
    MusicasController.listBy(params)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

router.get('/obras/:id', function(req, res, next) {

    const id = req.params.id;
    MusicasController.consult(id)
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

router.get('/tipos', function(req, res, next) {

    MusicasController.listTypes()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

router.get('/obrasQuant', function(req, res, next) {

    MusicasController.listObrasQuant()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
})

module.exports = router;
