var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Movie = require('../models/movie')
const MovieController = require('../controllers/movies')


const HOMEPATH = /^(\/|\/movies)$/

/* GET movies home page. */
router.get(HOMEPATH, function (req, res, next) {

    res.render('home.pug')
    //res.render('movies', { title: 'Express' });
});


router.get('/movies/year/', function (req, res, next) {
    res.redirect('/movies/year/' + req.query.year)

})
router.get('/movies/year/:year', function (req, res, next) {

    const year = parseInt(req.params.year)

    MovieController.list(year)
        .then(movies => res.render('movies.pug', { movies: movies }))
        .catch(error => res.render('error.pug', { error: error }))
})

/* GET single movie page */
router.get('/movies/:movieID', function (req, res, next) {

    var movieID = req.params.movieID

    MovieController.consult(movieID)
        .then(movie => res.render('movie.pug', { movie: movie }))
        .catch(error => res.render('error.pug', { error: error }))
})

router.get('/edit-item/:movieID', function (req, res, next) {
    console.log("Trying to edit " + req.params.movieID);
    var movieID = req.params.movieID;
    MovieController.consult(movieID)
        .then(movie => res.render('edit.pug', { movie: movie }))
        .catch(error => res.render('error.pug', { error: error }))
});

router.get('/add-movie', function (req, res, next) {
    
    res.render('add-form.pug')
})

/* POST a movie */
router.post('/movies', function (req, res) {

    const movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        cast: (req.body.cast).split(","),
        genres: (req.body.genres).split(",")
    })

    MovieController.insert(movie)
        .then(movie => res.redirect('/movies'))
        .catch(error => res.render({ error: error }))
})


/* DELETE a movie */
router.delete('/movies/:movieID', function (req, res) {

    var movieID = req.params.movieID

    MovieController.delete(movieID)
        .then(() => res.sendStatus(200))
        .catch(error => res.render({ error: error }))
})


/* PUT a movie */
router.put('/movies/:movieID', function (req, res) {

    var movieID = req.params.movieID

    MovieController.update(movieID, req.body)
        .then(() => res.sendStatus(200))
        .catch(error => res.render({ error: error}))
})

module.exports = router; 
