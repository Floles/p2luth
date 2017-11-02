var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

/* A valider GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* A valider GET page Mes créations. */
router.get('/mescreations', function(req, res, next) {
  res.render('gabarit1');
});

/* A valider GET page Me contacter. */
router.get('/contact', function(req, res, next) {
  res.render('contact');
});

/* A valider GET page Produit. */
router.get('/produit/product-:id([\\d+])', function(req, res, next) {
  connection.query('SELECT * FROM products WHERE id_products = ?;', [req.params.id], function(error, results, fields){
		if (error) {
			console.log(error);
		};
		if (results.length == 0){
			res.sendStatus(404);
		}
		res.render('gabaritpdt', {
        	products:results[0]
      	});
	});
	
});

router.get('/mentions-legales', function(req, res, next) {
  res.render('mentionslegales');
});


module.exports = router;