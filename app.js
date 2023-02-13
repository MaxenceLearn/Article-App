// Import librairies
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// Import routes
const log = require('./routes/log');
const getinfos = require('./routes/getInfos');
const article = require('./routes/article');
// Definition des outils
app.use(cookieParser());
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.static('./views'));

// Connexion à la base de données
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://admin:nSfNRGjtYYrVZvcq@cluster0.ap1m6ba.mongodb.net/?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


app.get('/', (req, res) => {
    res.render('../views/index');
});
app.use('/log', log);
app.use('/getinfos', getinfos);
app.use('/article', article);


module.exports = app;

