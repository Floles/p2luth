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

/* GET page Me contacter */
router.get('/contact', function (req, res, next) {
    res.render('contact');
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
