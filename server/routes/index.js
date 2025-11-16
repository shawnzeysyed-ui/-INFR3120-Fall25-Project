var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET home page alias */
router.get('/home', function(req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET dashboard page */
router.get('/dashboard', function(req, res, next) {
  res.render('index', {
    title: 'Dashboard'
  });
});

/* Redirect singular /assignment to /assignments */
router.get('/assignment', function(req, res, next) {
  res.redirect('/assignments');
});

module.exports = router;
