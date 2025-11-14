var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
     title: 'Home'
     });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', {
     title: 'Home'
     });
});

/* GET about page. */
router.get('/assignments', function(req, res, next) {
  res.render('index', {
     title: 'Assignments'
     });
});

/* GET services page. */
router.get('/dashboard', function(req, res, next) {
  res.render('index', {
     title: 'Dashboard'
     });
});


module.exports = router;
