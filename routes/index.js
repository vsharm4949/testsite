var express = require('express');
var router = express.Router();
const players = require('./players.json');


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Homepage', players: players.profiles });
  // res.send('Hello, world!')
});

module.exports = router;
