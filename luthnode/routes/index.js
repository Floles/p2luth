var express = require('express');
var router = express.Router();
/* A valider GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* A valider GET page Mes créations. */
router.get('/gabarit1', function(req, res, next) {
  res.render('gabarit1');
});

/* A valider GET page Me contacter. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

/* A valider GET page Produit. */
router.get('/gabaritpdt', function(req, res, next) {
  res.render('gabaritpdt');
});

router.get('/mentions-legales', function(req, res, next) {
  res.render('mentionslegales');
});


module.exports = router;