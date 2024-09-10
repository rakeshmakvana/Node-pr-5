const express = require('express');
const router = express.Router();
const movies = require('../controllers/movieController');
const upload = require('../configration/movieMulter');

router.get('/', movies.getMovie);
router.get('/addMovie', movies.addMovieForm);
router.post('/add', upload.single('poster'), movies.addMovie);
router.get('/edit/:id', movies.editMovieForm);
router.post('/edit/:id', upload.single('poster'), movies.editMovie);
router.get('/delete/:id', movies.deleteMovie);

module.exports = router;