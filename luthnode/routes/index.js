var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');
const nodemailer = require('nodemailer');

const connection = mysql.createConnection(config);

connection.connect();

/* GET homepage */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET page Mes créations */
router.get('/mescreations', function (req, res, next) {
    connection.query('SELECT * FROM products ORDER BY fk_id_categories desc,  id_products desc;', function (error, results, fields) {
        res.render('gabarit1', {

            guitar: results.filter(function(b){
                return b.fk_id_categories == 1;
            }),    
            violoncelle: results.filter(function(b){
                return b.fk_id_categories == 2;
            })
        });
    });
});

/* GET page Mon métier */
router.get('/monmetier', function (req, res, next) {

    res.render('gabaritmetier');
});

/* GET page Produit, détails d'un produit */
router.get('/product-:id(\\d+)', function (req, res, next) {
    connection.query('SELECT * FROM products WHERE id_products = ? ;',[req.params.id], function (error, results, fields) {
        res.render('gabaritpdt', {
            products: results
        });
    });
});
/* GET page Me contacter */
router.get('/contact', function (req, res, next) {
    connection.query('SELECT content FROM commercial_details WHERE id_cd = 1 OR id_cd = 6 OR id_cd = 7;', function (error, results, fields) {
        
        res.render('contact', {
            detail: results[1]
        });
    });
});

/* GET page Footer */
router.get('/', function (req, res, next) {
    connection.query('SELECT content FROM commercial_details WHERE id_cd = 8;', function (error, results, fields) {
        
        res.render('footer', {
            footer: results[0]
        });
    });
});



router.post('/contact', function (req, res, next) {
    var transport = nodemailer.createTransport({
        host : "smtp.mailtrap.io",
        port : 2525,
        auth : {
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
    transport.sendMail(mailOptions, function (error, response){
        if(error){
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
