const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) return req.logged = false, res.redirect('/');
    const decodedToken = jwt.verify(token, 'TOKEN');
    const userId = decodedToken.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                req.logged = false;
            }
            res.json({
                pseudo: user.pseudo,
                id: user._id,
                avatar: user.avatar
            });
        })
        .catch(error => res.json({
            error: error
        }));
});

module.exports = router;