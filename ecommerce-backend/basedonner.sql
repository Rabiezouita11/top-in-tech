-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour ecommerce
DROP DATABASE IF EXISTS `ecommerce`;
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `ecommerce`;

-- Listage de la structure de la table ecommerce. adresse
DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_postale` varchar(255) COLLATE utf8_bin NOT NULL,
  `rue` varchar(255) COLLATE utf8_bin NOT NULL,
  `numero_boite_lettre` varchar(255) COLLATE utf8_bin NOT NULL,
  `ville` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `adresse_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.adresse : ~0 rows (environ)
/*!40000 ALTER TABLE `adresse` DISABLE KEYS */;
/*!40000 ALTER TABLE `adresse` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. avis
DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.avis : ~0 rows (environ)
/*!40000 ALTER TABLE `avis` DISABLE KEYS */;
/*!40000 ALTER TABLE `avis` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `Image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.categories : ~0 rows (environ)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `Image`) VALUES
	(2, 'camera', 'public\\caetgory\\1670950526589.jpg'),
	(3, 'telephone', 'public\\caetgory\\1670950992662.jpg'),
	(4, 'ordinateur', 'public\\caetgory\\1670951174199.jpg'),
	(5, 'tablete', 'public\\caetgory\\1670951321676.jpg'),
	(6, 'kit  bluetooth', 'public\\caetgory\\1670951537452.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. commandes
DROP TABLE IF EXISTS `commandes`;
CREATE TABLE IF NOT EXISTS `commandes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Produit` varchar(255) COLLATE utf8_bin NOT NULL,
  `total_prix` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `Ville` varchar(255) COLLATE utf8_bin NOT NULL,
  `etat_commande` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_livreur` int(11) NOT NULL,
  `created` datetime DEFAULT NULL,
  `date_livraison` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_livreur` (`id_livreur`),
  CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`id_livreur`) REFERENCES `livreurs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.commandes : ~0 rows (environ)
/*!40000 ALTER TABLE `commandes` DISABLE KEYS */;
/*!40000 ALTER TABLE `commandes` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. contacts
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `message` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.contacts : ~1 rows (environ)
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` (`id`, `nom`, `email`, `message`) VALUES
	(1, 'aa', 'aa', 'aa');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. coupon
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_expiration` varchar(255) COLLATE utf8_bin NOT NULL,
  `prix` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `etat` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.coupon : ~0 rows (environ)
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. expererpanier
DROP TABLE IF EXISTS `expererpanier`;
CREATE TABLE IF NOT EXISTS `expererpanier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_expiration` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `expererpanier_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.expererpanier : ~0 rows (environ)
/*!40000 ALTER TABLE `expererpanier` DISABLE KEYS */;
INSERT INTO `expererpanier` (`id`, `date_expiration`, `id_user`) VALUES
	(1, '2022-12-14', 6);
/*!40000 ALTER TABLE `expererpanier` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. historiques
DROP TABLE IF EXISTS `historiques`;
CREATE TABLE IF NOT EXISTS `historiques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_commande` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_commande` (`id_commande`),
  CONSTRAINT `historiques_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commandes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.historiques : ~0 rows (environ)
/*!40000 ALTER TABLE `historiques` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiques` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. imageproduits
DROP TABLE IF EXISTS `imageproduits`;
CREATE TABLE IF NOT EXISTS `imageproduits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produit` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `imageproduits_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.imageproduits : ~5 rows (environ)
/*!40000 ALTER TABLE `imageproduits` DISABLE KEYS */;
INSERT INTO `imageproduits` (`id`, `id_produit`, `image`) VALUES
	(10, 4, 'public\\produit\\1670950602144.jfif'),
	(11, 5, 'public\\produit\\1670950643186.jpg'),
	(12, 5, 'public\\produit\\1670950643187.png'),
	(13, 6, 'public\\produit\\1670950870090.jfif'),
	(14, 7, 'public\\produit\\1670950916368.png'),
	(15, 8, 'public\\produit\\1670951047929.jpg'),
	(16, 9, 'public\\produit\\1670951095568.jpg'),
	(17, 10, 'public\\produit\\1670951201365.jpg'),
	(18, 11, 'public\\produit\\1670951224092.jpg'),
	(19, 12, 'public\\produit\\1670951379291.jpg'),
	(20, 13, 'public\\produit\\1670951463792.png'),
	(21, 14, 'public\\produit\\1670951569461.jpg'),
	(22, 15, 'public\\produit\\1670951597924.jfif');
/*!40000 ALTER TABLE `imageproduits` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. livreurs
DROP TABLE IF EXISTS `livreurs`;
CREATE TABLE IF NOT EXISTS `livreurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_bin NOT NULL,
  `prenom` varchar(255) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `tel` varchar(255) COLLATE utf8_bin NOT NULL,
  `adresse` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.livreurs : ~0 rows (environ)
/*!40000 ALTER TABLE `livreurs` DISABLE KEYS */;
/*!40000 ALTER TABLE `livreurs` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. panier
DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_produit` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `prix` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `categorie` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `newprix` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.panier : ~0 rows (environ)
/*!40000 ALTER TABLE `panier` DISABLE KEYS */;
INSERT INTO `panier` (`id`, `nom_produit`, `image`, `prix`, `description`, `categorie`, `quantite`, `id_user`, `id_produit`, `newprix`) VALUES
	(9, NULL, NULL, 1500000, NULL, NULL, 1, 6, 4, 1500000),
	(10, NULL, NULL, 75, NULL, NULL, 1, 6, 15, 75);
/*!40000 ALTER TABLE `panier` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. produits
DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id_categorie` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `promotion` varchar(255) COLLATE utf8_bin DEFAULT 'false',
  `numberpromotion` int(11) DEFAULT NULL,
  `date_exp` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `prixold` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.produits : ~2 rows (environ)
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` (`id`, `nom`, `image`, `prix`, `Description`, `id_categorie`, `quantite`, `created`, `promotion`, `numberpromotion`, `date_exp`, `prixold`) VALUES
	(4, 'camera digitale', 'public\\produit\\1670950602144.jfif', 1500000, 'azeazeazeazeazeazeazeazeazeazeaze', 2, 20, NULL, 'true', 50, '2022-12-14', 3000000),
	(5, 'camera', 'public\\produit\\1670950643186.jpg', 300, 'azeazeaeaz', 2, 200, NULL, 'false', NULL, NULL, NULL),
	(6, 'cameraa', 'public\\produit\\1670950870090.jfif', 600, 'azeaeaze', 2, 20, NULL, 'false', NULL, NULL, NULL),
	(7, 'camera digitalee', 'public\\produit\\1670950916368.png', 600, 'azeazeaze', 2, 0, NULL, 'false', NULL, NULL, NULL),
	(8, 'telephone ', 'public\\produit\\1670951047929.jpg', 700, 'azeazeazeaez', 3, 40, NULL, 'false', NULL, NULL, NULL),
	(9, 'samsung', 'public\\produit\\1670951095568.jpg', 20, 'azeazeaze', 3, 40, NULL, 'false', NULL, NULL, NULL),
	(10, 'hp', 'public\\produit\\1670951201365.jpg', 600, 'azeazeazeaztrazraazaz', 4, 40, NULL, 'false', NULL, NULL, NULL),
	(11, 'asus', 'public\\produit\\1670951224092.jpg', 700, 'azeazeazeazeaze', 4, 85, NULL, 'false', NULL, NULL, NULL),
	(12, 'tablette', 'public\\produit\\1670951379291.jpg', 400, 'azeazeazeaze', 5, 5, NULL, 'false', NULL, NULL, NULL),
	(13, 'tablettes', 'public\\produit\\1670951463792.png', 785, 'arzazrazr', 5, 40, NULL, 'false', NULL, NULL, NULL),
	(14, 'kit  bluetooth', 'public\\produit\\1670951569461.jpg', 50, 'azeazrazrz', 6, 147, NULL, 'false', NULL, NULL, NULL),
	(15, 'kitt  bluetooth', 'public\\produit\\1670951597924.jfif', 75, 'azazrazrazr', 6, 22, NULL, 'false', NULL, NULL, NULL);
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. quiz
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre_quiz` varchar(255) COLLATE utf8_bin NOT NULL,
  `option1` varchar(255) COLLATE utf8_bin NOT NULL,
  `option2` varchar(255) COLLATE utf8_bin NOT NULL,
  `option3` varchar(255) COLLATE utf8_bin NOT NULL,
  `bonne_reponse` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.quiz : ~1 rows (environ)
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`id`, `titre_quiz`, `option1`, `option2`, `option3`, `bonne_reponse`) VALUES
	(1, 'bb', '20', '30', '30', '14'),
	(2, 'aaa', '4', '4', '4', '5');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. rate
DROP TABLE IF EXISTS `rate`;
CREATE TABLE IF NOT EXISTS `rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `noter` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.rate : ~0 rows (environ)
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. reponse
DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reponse` varchar(255) COLLATE utf8_bin NOT NULL,
  `id_quiz` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_quiz` (`id_quiz`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `reponse_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `reponse_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.reponse : ~0 rows (environ)
/*!40000 ALTER TABLE `reponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `reponse` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_bin NOT NULL,
  `prenom` varchar(255) COLLATE utf8_bin NOT NULL,
  `mot_de_passe` varchar(255) COLLATE utf8_bin NOT NULL,
  `cin` int(11) NOT NULL,
  `role` varchar(255) COLLATE utf8_bin NOT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `banier` varchar(255) COLLATE utf8_bin DEFAULT 'false',
  `date_supprimer_compte` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- Listage des données de la table ecommerce.users : ~2 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `nom`, `prenom`, `mot_de_passe`, `cin`, `role`, `image`, `email`, `banier`, `date_supprimer_compte`, `code`) VALUES
	(2, 'rabie', 'zouita', '$2b$10$rcu69msa4JCisCkuSMELfeszVQDSEq289cKVR.64w829CQt61yV2G', 13633840, 'admin', 'public\\client\\1670894965932.jpg', 'rabie.zouita@esprit.tn', 'false', NULL, NULL),
	(6, 'rabie', 'zouita', '$2b$10$jzCcTBdjgLT2k8OCIO6Wle5qeQMCFEfDw4Ev9GLC5XwpCKY.HwV1y', 13633840, 'user', 'public\\client\\1670945110487.png', 'rabiezouita82@gmail.com', 'false', NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
