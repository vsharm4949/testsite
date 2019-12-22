var express = require('express');
var router = express.Router();
const players = require('./players.json');

/* GET users listing. */
router.get('/', (req, res) => {
    const player = players.profiles.find(p => p.id === req.query.id);
    res.render('profile', { 
        title: `About ${player.firstname} ${player.lastname}`,
        player
    });
});

module.exports = router;