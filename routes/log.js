const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const avatarCheck = require('../middlewares/avatarCheck');
const Article = require('../models/article');
router.post('/', avatarCheck, (req, res) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                pseudo: req.body.pseudo,
                password: hash,
                avatar: req.body.avatar || 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
                role: "user"
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'Utilisateur créé !'
                }))
                .catch(error => res.status(500).json({
                    error: error
                }));
        });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
        pseudo: req.body.pseudo
    })
    .then(user => {
        if (!user) {
            return res.status(401).json({
                error: 'Utilisateur non trouvé !'
            });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(400).json({
                        error: 'Mot de passe incorrect !'
                    });
                }
                const token = jwt.sign({
                        userId: user._id,
                        username: user.pseudo,
                        avatar: user.avatar
                    },
                    'TOKEN', {
                        expiresIn: '24h'
                    }
                )
                res.cookie('token', token).status(200).json({
                    message: 'Connexion réussie !'
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                  error
                });
              });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          error
        });
      });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').status(200).json({
        message: 'Déconnexion réussie !'
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/').status(200).json({
        message: 'Déconnexion réussie !'
    });
});

router.delete('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.json({ logged: false });
    const decodedToken = jwt.verify(token, 'TOKEN');
    const userId = decodedToken.userId;
    User.findOne({
            _id: userId
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'Utilisateur non trouvé !'
                });
            }
            User.deleteOne({
                    _id: userId
                })
                .then(() => 
                    Article.deleteMany({
                        author: userId
                    })
                    .then(() => res.status(200).json({
                        message: 'Utilisateur supprimé !'
                    }))
                    .catch(error => res.status(500).json({
                        error: error
                    }))
                )
                .catch(error => res.status(500).json({
                    error: error
                }));
        })
        .catch(error => res.status(500).json({
            error: error
        }));
});

module.exports = router;