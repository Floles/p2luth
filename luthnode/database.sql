create database luthier; 

use luthier;

CREATE TABLE modeles
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    instrument VARCHAR(45) NOT NULL,
    produit VARCHAR(45) NOT NULL,
    reference VARCHAR(45) NOT NULL,
    marque VARCHAR(45) NOT NULL,
    bois_utilise VARCHAR(45) NOT NULL,
    description VARCHAR(500) NOT NULL
)

INSERT INTO posts VALUES (NULL, 'mon premier instrument', 'xxx', 'marque', 'bois utilisé', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod');

CREATE TABLE users 
(
  id_user int(11) PRIMARY KEY NULL auto_increment,
  username varchar(45) NOT NULL ,
  passeword varchar(30) NOT NULL 
);

INSERT INTO users values (null, 'toto', 1234);

