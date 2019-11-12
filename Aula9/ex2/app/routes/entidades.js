var express = require('express');
var router = express.Router();
var axios = require('axios');

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ"

router.get('/', function(req, res, next) {

    axios.get('http://clav-api.dglab.gov.pt/api/entidades/?apikey=' + apikey)
        .then(result => {
            res.render('index', { entidades: result.data })
        })
        .catch(error => {
            res.render('error', { error: error })
        });
});

router.get('/:id', function(req, res, next) {

    const id = req.params.id;
    
    axios.all([
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id + '?apikey=' + apikey),
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id + '/tipologias?apikey=' + apikey),
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id + '/intervencao/dono/?apikey=' + apikey),
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + id + '/intervencao/participante/?apikey=' + apikey)
    ])
    .then(axios.spread( (entidadeRes, tipologiasRes, donoRes, participanteRes) => {
        res.render('entidade', {
            entidade: entidadeRes.data,
            tipologias: tipologiasRes.data,
            processosDono: donoRes.data,
            processosParticipa: participanteRes.data
        });
    }))
    .catch(err => {
        res.render('error', { error: err })
    })
})

module.exports = router;
