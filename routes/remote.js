const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/remote');
});

router.post('/', (req, res) => {
    global.io.emit('song', req.body.song);
    res.json({message: 'Message envoyé !'});
});

router.post('/m', (req, res) => {
    global.io.emit('message', req.body.message);
    res.json({message: 'Message envoyé !'});
});

router.get('/s', (req, res) => {
    global.io.emit('spin');
    res.json({message: 'Message envoyé !'});
});

router.post('/ad' , (req, res) => {
    global.io.emit('ad', req.body.ad);
    res.json({message: 'Message envoyé !'});
});
module.exports = router;