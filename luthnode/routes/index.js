var express = require('express');
var router = express.Router();
/* A valider GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* A valider GET page Mes créations. */
router.get('/', function(req, res, next) {
  res.render('gabarit1.pug');
});

/* A compléter GET page Mon métier. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* A valider GET page Me contacter. */
router.get('/', function(req, res, next) {
  res.render('contact.pug');
});

/* A valider GET page Produit. */
router.get('/', function(req, res, next) {
  res.render('gabaritpdt.pug');
});



module.exports = router;