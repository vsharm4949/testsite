var express = require('express');
var router = express.Router();

// Get abc
router.get('/', function(req, res, next) {
    res.render('alphabet', { title: 'AB\'s' });
});

module.exports = router;