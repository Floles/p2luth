var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();


// Page admin login/

router.get('/admin', function(req, res, next) {
	res.render('admin');
});

router.post('/admin', function(req, res, next) {
	let fail = '';
	let login= req.body.login;
	let password = req.body.password;
	connection.query(`select * from users where username= ? and passeword= ?`, [login,password], function (error, results, fields) {
		if (results.length==0) {
			res.render('admin-index', {
				fail: 'Identifiant et/ou mot de passe invalides'
			});
		} else {
			req.session.connected=true;
			res.redirect('admin-index');
		}
	});
});

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