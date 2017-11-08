create database luthier; 

use luthier;

CREATE TABLE categories
(
    id_categories INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL
);

INSERT INTO categories VALUES (NULL, 'guitare ou violoncelle');

CREATE TABLE products
(
    id_products INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product VARCHAR(45) NOT NULL,
    reference VARCHAR(45) NOT NULL,
    marque VARCHAR(45) NOT NULL,
    bois_utilise VARCHAR(45) NOT NULL,
    description text NULL,
    image text,
    fk_id_categories int(11),
    FOREIGN KEY (fk_id_categories) REFERENCES categories(id_categories)
);

INSERT INTO products VALUES (NULL, 'mon premier produit', 'reference', 'marque', 'bois utilisé', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod', '', 1);

CREATE TABLE commercial_details
(
    id_cd INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    content text NULL,
    image text
);

INSERT INTO commercial_details VALUES (NULL, 'page contact', 'description de la rubrique', '');

INSERT INTO commercial_details VALUES (NULL, 'page accueil', 'description de la rubrique', '');

INSERT INTO commercial_details VALUES (NULL, 'page métier', 'description de la rubrique', '');