var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/welcome', {title: 'home'});
});
router.get('/about', function(req, res, next) {
  res.render('home/about', {title: "about"})
});

module.exports = router;
