// Import librairies
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// Import routes
const remote = require('./routes/remote');

// Definition des outils
app.use(cookieParser());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('./views'));

// Connexion à la base de données


app.get('/', (req, res) => {
    res.render('../views/index');
});

app.use('/remote', remote);

module.exports = app;