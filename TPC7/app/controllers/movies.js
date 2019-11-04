const mongoose = require('mongoose')

const Movie = require('../models/movie')

const MovieController = module.exports


MovieController.list = (year) => {
    return Movie
        .aggregate([
            {
                $match: {
                    year: year
                }
            }
        ])
        .sort({ title: 1 })
        .exec()
}


MovieController.consult = (movieID) => {
    return Movie
        .findById(movieID)
        .exec()
}


MovieController.insert = (data) => {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: data.title,
        year: data.year,
        cast: data.cast,
        genres: data.genres
    })

    return movie.save()
}


MovieController.delete = (movieID) => {
    return Movie
        .deleteOne({ _id: movieID })
        .exec()
}


MovieController.update = (movieID, data) => {
    return Movie
        .updateOne( { _id: movieID }, data)
        .exec()
}