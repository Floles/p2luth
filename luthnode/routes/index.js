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

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2b3cba5fb09024",
    pass: "9e45dfb842f491"
  }
});

router.post('/contact', function(req, res, next) {
    transport.sendMail({
        from: req.destination, // Expediteur
        to: "supergrandma@yopmail.com", // Destinataires
        subject: "Luthier site", // Sujet
        text: req.message, // plaintext body
        html: '<b>' + req.message + '</b>' // html body
    }, (error, response) => {
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
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
