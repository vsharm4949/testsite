var express = require('express');
var router = express.Router();
//const players = require('./players.json');
// Open database in memory
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database');
});

/* GET users listing. */
router.get('/', (req, res) => {
    let players = [];
    db.all(`SELECT * FROM players where id = '${req.query.id}'`, [], (err, rows) => {
        var player;

        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
            rows.forEach(row => {
                // console.log(row.first);
                player = {
                    'firstname': row.first,
                    'lastname': row.last,
                    'bio': row.bio,
                    'tagline': row.tagline,
                    'twitter': row.twitter,
                    'img': row.img,
                    'id': row.id
                }
            });
            console.log(player);
        }
        res.render('profile', {
            title: `About ${player.firstname} ${player.lastname}`,
            player
        });
    });
});
/* GET users listing. */
// router.get('/', (req, res) => {
//     const player = players.profiles.find(p => p.id === req.query.id);
//     res.render('profile', { 
//         title: `About ${player.firstname} ${player.lastname}`,
//         player
//     });
// });

module.exports = router;