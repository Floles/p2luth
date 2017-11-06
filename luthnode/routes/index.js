var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

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

/* GET page Mentions légales */
router.get('/mentions-legales', function (req, res, next) {
    res.render('mentionslegales');
});

module.exports = router;
