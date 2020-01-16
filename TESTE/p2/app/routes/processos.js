var express = require('express');
var router = express.Router();
var axios = require('axios');

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ"


router.get('/:id', function(req, res, next) {

    const id = 'c' + req.params.id;
    
    axios.get('http://clav-api.dglab.gov.pt/api/classes/' + id + '?apikey=' + apikey)
    .then(result => {
        res.jsonp(result.data)
    })
    .catch(err => {
        res.render('error', { error: err })
    })
})

module.exports = router;
