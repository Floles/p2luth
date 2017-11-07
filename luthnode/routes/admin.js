
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();

	// Page de connexion

/*users = [{
"name" : 'admin',
"mdp" : '123' 

}];/*
// page de login


// Ici on gère les informations de l'utilisateur


// Tester si l'utilisateur existe en BDD -> Comparer le nom (login) / le password


// Si faux on lui envoie un message pour l'informer 
// Si vrai -> On ouvre la session & on le redirige sur /admin 

/*	connection.query(`select * from users where name= ?;`,[req.body.name], 
		function (error, results, fields) {
	 	 res.render('index', { 
	 	 	title: 'Express',
	 	 	error : JSON.stringify(error),
	 	 	results: JSON.stringify(results), 
	 	 	fields : JSON.stringify(fields)
	 	 	 });
 	 
	});*/
//deconection
	router.get("/logout", function(req, res, next) {
req.session.connect = false;
res.redirect("admin");

});

// GET /admin 
router.get('/admin-index', function(req, res, next) {
	// Liste des produits
	connection.query('SELECT * FROM products;', function(error, results, fields){
		if (error) {
			console.log(error);
		}else {
			res.render('admin-index', {products:results});
		};
	});
	
});

// GET /admin/create
router.get('/create', function(req, res, next) {
	// WYSIWYG
	res.render('admin_create');
});

// POST /admin/create
router.post('/create', function(req, res, next) {
	
	connection.query('INSERT INTO products(id_products, product, reference, marque, bois_utilise, description) VALUES(NULL, ?, ?, ?, ?, ?);',
	[req.body.product, req.body.reference, req.body.marque, req.body.bois_utilise, req.body.description],
	function(error, results, fields){
		if (error) {
			console.log(error);
		} else {
			res.redirect('/admin-index');
		};
	});
});
// GET update
router.get('/update/produit:id_products(\\d+)',function(req, res){
	connection.query('SELECT * FROM products WHERE id_products = ?;', [req.params.id_products], function(error, results){

		res.render('admin-update', {
			products: results[0]
		});
	});
});

// image à remettre dans la connection query (req.body.image, image = ?)
router.post('/update/produit:id_products(\\d+)', function(req, res){
	connection.query('UPDATE products SET product = ?, reference = ?, marque = ?, bois_utilise = ?, description = ? WHERE id_products = ?;', 
		[req.body.product, req.body.reference, req.body.marque, req.body.bois_utilise, req.body.description, req.params.id_products], function(error){
		if (error) {
			console.log(error);
		} else {
			res.redirect('/admin');
		}
	});
});

// Delete
router.get('/supprimer/produit-:id_products(\\d+)',function(req, res){
	connection.query('DELETE FROM products WHERE id_products = ?;', [req.params.id_products], function(error){
		if (error) {
			console.log(error);
		} else {
			res.redirect('/admin');
		}

	});
});


/*router.get('/disconnect', function(req, res, next) {
  res.render('disconnect', { title: 'Express' });
});*/



module.exports = router;
