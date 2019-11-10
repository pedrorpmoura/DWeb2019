var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
    
    res.render('index', { title: 'Express' });
});


router.get('/prizes', function(req, res, next) {
    
    axios.get('http://localhost:3000/api/prizes',
        {
            params: {
                date: req.query.date,
                category: req.query.category
            }
        })
        .then(result => res.render('prizes', { prizes: result.data }))
        .catch(err => res.render('error', { error: err }));
})


router.get('/prizes/:prizeID', function (req, res, next) {

    const prizeID = req.params.prizeID;

    axios.get('http://localhost:3000/api/prizes/' + prizeID)
        .then(result => res.render('prize', { prize: result.data[0] }))
        .catch(err => res.render('error', { error: err }))
});


router.get('/categories', function (req, res, next) {

    axios.get('http://localhost:3000/api/categories')
        .then(result => res.render('categories', { categories: result.data }))
        .catch(err => res.render('error', { error: err }))
})

module.exports = router;
