var express = require('express');
var router = express.Router();

/* A valider GET home page. */
router.get('/index-pug', function(req, res, next) {
  res.render('index.pug', { title: 'Accueil' });
});

/* A valider GET page Mes créations. */
router.get('/gabarit1-pug', function(req, res, next) {
  res.render('gabarit1.pug', { title: 'Mes créations' });
});

/* A compléter GET page Mon métier. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A valider GET page Me contacter. */
router.get('/contact-pug', function(req, res, next) {
  res.render('contact.pug', { title: 'Me contacter' });
});

/* A valider GET page Produit Guitare 1. */
router.get('/gabaritpdt-pug', function(req, res, next) {
  res.render('gabaritpdt.pug', { title: 'Modèle de guitare 1' });
});

/* A compléter GET page Produit Guitare 2. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page Produit Violoncelle 1. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page Produit Violoncelle 2. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page accueil admin. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page admin connected. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page admin error. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* A compléter GET page admin disconnected. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
