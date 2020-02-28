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




/* GET home page. */
router.get('/', (req, res) => {
  let players = [];
  db.all(`SELECT * FROM players`, [], (err, rows) => {
  

    if (err) {
      res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
    }
    else {
      rows.forEach(row => {
        // console.log(row.first);
        var player = {
          'firstname': row.first,
          'lastname': row.last,
          'imgSrc': row.imgSrc,
          'id': row.id
        }
        players.push(player);
      });
      console.log(players);
      console.log(players[0]);
    }
    res.render('index', { title: 'Homepage', players: players });
  });

  
  // res.send('Hello, world!')
});

// Close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.')
// });
module.exports = router;
