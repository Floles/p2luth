var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

// Page admin login/

router.get('/admin-login', function(req, res, next) {
	res.render('admin');
});

router.post('/admin-login', function(req, res, next) {
    let fail = '';
	let login= req.body.login;
	let password = req.body.password;
	connection.query(`select * from users where username="${login}" and passeword="${password}";`, 
        function (error, results, fields){
        if (results.length==0) {
			res.send('erreur');
		} else {
			req.session.connected=true;
			res.redirect('/admin');
		}
	});
});
//page log
router.get('/logged', function(req, res, next) {
if(req.session.connected){
res.redirect('/admin');
}
else{
    res.redirect('/admin-login');
}

});

//disconnect
router.get("/admin-logout", function(req, res, next) {
    req.session.connected=false;
    res.redirect('/admin-login');
});

/* A valider GET page Me contacter. */

/* GET homepage */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET page Mes créations */
router.get('/mescreations', function (req, res, next) {
    res.render('gabarit1');
});

/* GET page Mon métier */
router.get('/monmetier', function (req, res, next) {
    res.render('gabaritmetier');
});

/* GET page Produit, détails d'un produit */
router.get('/produit/product-:id([\\d+])', function (req, res, next) {
    connection.query('SELECT * FROM products WHERE id_products = ?;', [req.params.id], function (error, results, fields) {
        if (error) {
            console.log(error);
        };
        if (results.length == 0) {
            res.sendStatus(404);
        }
        res.render('gabaritpdt', {
            products: results[0]
        });
    });
});

/* GET page Me contacter */
router.get('/contact', function (req, res, next) {
    res.render('contact');
});

/* GET page Mentions légales */
router.get('/mentions-legales', function (req, res, next) {
    res.render('mentionslegales');
});

module.exports = router;
