var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('index', { title: 'Express' });
});


router.get('/prizes', function(req, res, next) {
    
    axios.get('http://localhost:3000/api/prizes')
        .then(result => {
            res.render('prizes', { prizes: result.data })
        })
        .catch(err => res.render('error', { error: err }));
})

module.exports = router;
