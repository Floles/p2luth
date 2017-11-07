
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');
const fs = require('fs');
const multer  = require('multer');
const upload = multer({ dest: 'tmp/' });
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
	

// GET /admin 
router.get('/', function(req, res, next) {
	// Liste des produits
	if(req.session.connected) {
        connection.query('SELECT * FROM products;', function(error, results, fields){
		if (error) {
			console.log(error);
		}else {
			//console.log(results)
			res.render('admin-index', {products:results});
		};
	});
	
    }
    else{
        res.redirect('/admin-login')
    }

});


// GET /admin/create
router.get('/create', function(req, res, next) {
	// WYSIWYG
	res.render('admin_create');
});

// POST /admin/create

router.post('/create', upload.single('image'), function(req, res, next) {
	// Création d'article
	if (req.file.size < (4*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
		fs.rename(req.file.path,'public/images/'+ req.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement');
	}
	connection.query('INSERT INTO products VALUES(NULL, ?, ?, ?, ?, ?, ?, NULL);',
	[req.body.product, req.body.reference, req.body.marque, req.body.bois_utilise, req.body.description, req.file.originalname],

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
router.post('/update/produit:id_products(\\d+)', upload.single('image'), function(req, res){
	if (req.file.size < (4*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg')) {
		fs.rename(req.file.path,'public/images/'+ req.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement');
	}
	connection.query('UPDATE products SET product = ?, reference = ?, marque = ?, bois_utilise = ?, description = ?, image = ? WHERE id_products = ?;', 
		[req.body.product, req.body.reference, req.body.marque, req.body.bois_utilise, req.body.description, req.file.originalname, req.params.id_products], function(error){
		if (error) {
			console.log(error);
		} else {
			res.redirect('/admin');
		}
	});
});

// Delete
router.get('/supprimer/produit-:id_products(\\d+)',function(req, res) {
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
