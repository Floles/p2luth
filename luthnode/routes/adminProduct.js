const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');

const connection = mysql.createConnection(config);

connection.connect();


// GET /admin 
router.get('/', function(req, res, next) {
	// Liste des produits
	connection.query('SELECT * FROM produits;', function(error, results, fields){
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
	res.render('admin-create');
});

// POST /admin/create
router.post('/create', upload.single('produit_image'), function(req, res, next) {
	// Création d'article
	if (req.file.size < (4*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg') ) {
		fs.rename(req.file.path,'public/images/'+ req.file.originalname);
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement');
	}
	connection.query('INSERT INTO produits VALUES(à remplir);',[req.body.?, req.body.?],
	function(error, results, fields){
		if (error) {
			console.log(error);
		} else {
			res.redirect('/admin');
		};
	});
});





module.exports = router;