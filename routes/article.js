const express = require('express');
const router = express.Router();
const articleCheck = require('../middlewares/articleCheck');
const Article = require('../models/article');
const jwt = require('jsonwebtoken');
const fileUpload = require('../middlewares/uploadFile');
const User = require('../models/user');
router.post('/', fileUpload, articleCheck, (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ logged: false });
    const decodedToken = jwt.verify(token, 'TOKEN');
    const userId = decodedToken.userId;
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        topic: req.body.topic,
        content: req.body.content,
        preview: `cdn/${req.file.filename}`,
        author: userId
    });
    article.save()
        .then(() => res.status(201).json({
            message: 'Article créé !'
        }))
        .catch(error => res.status(500).json({
            error: error
        }));
});

router.post('/last', (req, res) => {
    console.log(req.body);
    let query = {};
    if(req.body.topic && req.body.topic != 'undefined') {
        query.topic = req.body.topic;
    } else if (req.body.id && req.body.id != 'undefined') {
        query._id = req.body.id;
    } else if (req.body.author && req.body.author != 'undefined') {
        query.author = req.body.author;
    }
    Article.find(query)
        .sort({ _id: -1 })
        .limit(req.body.limit)
        .then(article => res.status(200).json(article))
        .catch(error => res.status(400).json({
            error: error
        }));
});

router.delete('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ logged: false });
    const decodedToken = jwt.verify(token, 'TOKEN');
    const userId = decodedToken.userId;
    const userRole = decodedToken.role;
    Article.findOne({
            _id: req.body.id
        })
        .then(article => {
            if (!article) {
                return res.status(401).json({
                    error: 'Article non trouvé !'
                });
            }
            if (article.author != userId || userRole != 'admin') {
                return res.status(401).json({
                    error: 'Vous n\'êtes pas l\'auteur de cet article !'
                });
            }
            Article.deleteOne({
                    _id: req.body.id
                })
                .then(() => res.status(200).json({
                    message: 'Article supprimé !'
                }))
                .catch(error => res.status(400).json({
                    error: error
                }));
        })
        .catch(error => res.status(500).json({
            error: error
        }));
});


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.post('/search', (req, res) => {
    console.log(req.body);
    if (req.body.search) {
        const regex = new RegExp(escapeRegex(req.body.search), 'gi');
        Article.find({ title: regex })
            .sort({ _id: -1 })
            .limit(req.body.limit)
            .then(article => res.status(200).json(article))
            .catch(error => res.status(400).json({
                error: error
            }));
    } else {
        res.status(200).json([]);
    }
    
});


module.exports = router;