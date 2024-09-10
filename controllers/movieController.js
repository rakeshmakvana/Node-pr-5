const fs = require('fs');
const path = require('path');
const Movie = require('../modules/movieDB');

const getMovie = async (req, res) => {
    const movies = await Movie.find();
    res.render('index', { movies });
};

const addMovieForm = (req, res) => {
    res.render('addMovie');
};

const addMovie = async (req, res) => {
    const { title, description, releaseDate, genre, rating } = req.body;
    const poster = req.file.filename;
    const newMovie = new Movie({ title, description, releaseDate, genre, rating, poster });
    await newMovie.save();
    res.redirect('/');
};

const editMovieForm = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render('editMovie', { movie });
};

const editMovie = async (req, res) => {
    const { title, description, releaseDate, genre, rating } = req.body;
    const movie = await Movie.findById(req.params.id);
    const updatedMovie = { title, description, releaseDate, genre, rating };
    if (req.file) {
        const oldPosterPath = path.join(__dirname, '..', 'uploads', movie.poster);
        fs.unlink(oldPosterPath, (err) => {
            if (err) {
                console.error('Error deleting old poster:', err);
            }
        });
        updatedMovie.poster = req.file.filename;
    }
    await Movie.findByIdAndUpdate(req.params.id, updatedMovie);
    res.redirect('/');
};

const deleteMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        const posterPath = path.join(__dirname, '..', 'uploads', movie.poster);
        fs.unlink(posterPath, (err) => {
            if (err) {
                console.error('Error deleting poster:', err);
            }
        });
        await Movie.findByIdAndDelete(req.params.id);
    }
    res.redirect('/');
};

module.exports = { getMovie, addMovieForm, addMovie, editMovieForm, editMovie, deleteMovie };