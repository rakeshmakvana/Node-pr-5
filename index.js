const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const router = require('./routes/movieRouter')
const URL = 'http://localhost:';
const PORT = 3005;
const MONGODB = 'mongodb://localhost:27017/Movie-Managment';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(MONGODB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Err', err));

app.use('/', router);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server running in ${URL}${PORT}`);
    } else {
        console.log('Err', err);
    };
});