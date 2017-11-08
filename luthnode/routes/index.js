var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');
const nodemailer = require('nodemailer');

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
    }else{
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
    connection.query('SELECT * FROM products ORDER BY fk_id_categories desc,  id_products desc;', function (error, results, fields) {
        res.render('gabarit1', {

            guitar: results.filter(function (b) {
                return b.fk_id_categories == 1;
            }),
            violoncelle: results.filter(function (b) {
                return b.fk_id_categories == 2;
            })
        });
    });
});

/* GET page Mon métier */
router.get('/monmetier', function (req, res, next) {
    connection.query('SELECT content FROM commercial_details WHERE id_cd = 5 OR id_cd = 3;', function (error, results, fields) {
        res.render('gabaritmetier', {
            details: results
        });
    });
});

/* GET page Produit, détails d'un produit */
router.get('/product-:id(\\d+)', function (req, res, next) {
    connection.query('SELECT * FROM products WHERE id_products = ? ;', [req.params.id], function (error, results, fields) {
        res.render('gabaritpdt', {
            products: results
        });
    });
});
/* GET page Me contacter */
router.get('/contact', function (req, res, next) {
    connection.query('SELECT content FROM commercial_details WHERE id_cd = 1 OR id_cd = 6 OR id_cd = 7;', function (error, results, fields) {

        res.render('contact', {
            details: results
        });
    });
});

router.post('/contact', function (req, res, next) {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "dfd01726c10a1e",
            pass: "468515e201bd79"
        }
    });
    var mailOptions = {
        from: req.body.email, // Expediteur
        to: "luthier@yopmail.com", // Destinataires
        subject: "Demande d'informations", // Sujet
        text: req.body.message, // plaintext body
        html: "<p>" + req.body.message + "</p>" // html body
    };
    console.log(req.body);
    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent : " + response.message);
    });
    transport.close();
    res.redirect('/contact');
});



/* GET page Mentions légales */
router.get('/mentions-legales', function (req, res, next) {
    res.render('mentionslegales');
});

module.exports = router;