var express = require('express');
var router = express.Router();
const fs = require('fs');
var Ficheiros = require('../controllers/ficheiros');
var Ficheiro = require('../models/ficheiros');

var multer = require('multer');
var upload = multer({ dest: 'uploads/'});

router.get('/ficheiros', function(req, res, next) {
    Ficheiros.listar()
        .then(data => res.jsonp(data))
        .catch(err => res.status(500).jsonp(err));
});

router.post('/ficheiros', upload.array('ficheiro'), function(req, res) {

    var ficheiros = [];

    for(let i = 0; i < req.files.length; i++) {

        let ficheiro = req.files[i];
        let oldPath = __dirname + '/../' + ficheiro.path;
        let newPath = __dirname + '/../public/ficheiros/' + ficheiro.originalname;

        fs.rename(oldPath, newPath, function(err) {
            if (err) {
                throw err;
            }
        });

        let data = new Date();

        let novoFicheiro = new Ficheiro({
            data: data.toISOString(),
            desc: req.body.desc[i],
            name: ficheiro.originalname,
            mimetype: ficheiro.mimetype,
            size: ficheiro.size
        });

        ficheiros.push(novoFicheiro.save());
    }

    Promise.all(ficheiros)
        .then(result => {
            console.log('Ficheiros guardados com sucesso');
            res.redirect('/');
        })
        .catch(err => {
            console.log('Erro a guardar ficheiro');
            res.status(500).jsonp(err);
        })

    res.redirect('/');
});


module.exports = router;
