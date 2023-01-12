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
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ecommerce`;

-- Listage de la structure de la table ecommerce. adresse
CREATE TABLE IF NOT EXISTS `adresse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_postale` varchar(255) NOT NULL,
  `rue` varchar(255) NOT NULL,
  `numero_boite_lettre` varchar(255) NOT NULL,
  `ville` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `adresse_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.adresse : ~0 rows (environ)
/*!40000 ALTER TABLE `adresse` DISABLE KEYS */;
/*!40000 ALTER TABLE `adresse` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. avis
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `etat` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.avis : ~8 rows (environ)
/*!40000 ALTER TABLE `avis` DISABLE KEYS */;
INSERT INTO `avis` (`id`, `id_user`, `message`, `date`, `etat`) VALUES
	(34, 1, 'good ', '2023-01-12 16:33:53', NULL),
	(35, 1, 'very bad ', '2023-01-12 16:34:04', NULL);
/*!40000 ALTER TABLE `avis` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.categories : ~0 rows (environ)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name`, `Image`) VALUES
	(1, 'pc', 'public\\caetgory\\1673019040484.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. commandes
CREATE TABLE IF NOT EXISTS `commandes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Produit` varchar(255) DEFAULT NULL,
  `total_prix` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `Ville` varchar(255) DEFAULT NULL,
  `typedelivraison` varchar(255) DEFAULT NULL,
  `etat_commande` varchar(255) DEFAULT NULL,
  `id_livreur` int(11) DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `date_livraison` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_livreur` (`id_livreur`),
  CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`id_livreur`) REFERENCES `livreurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.commandes : ~4 rows (environ)
/*!40000 ALTER TABLE `commandes` DISABLE KEYS */;
INSERT INTO `commandes` (`id`, `Produit`, `total_prix`, `id_user`, `Ville`, `typedelivraison`, `etat_commande`, `id_livreur`, `lng`, `lat`, `created`, `date_livraison`) VALUES
	(88, '["aaa*1","vvvvvv*1"]', 240, 1, NULL, 'cash', 'en cours', NULL, 9.5375, 33.8869, '2023-01-11 17:55:40', NULL),
	(89, '["aaa*1","vvvvvv*1"]', 240, 1, NULL, 'cash', 'en cours', NULL, 9.5375, 33.8869, '2023-01-11 17:57:27', NULL),
	(90, '["aaa*1","vvvvvv*1"]', 240, 1, NULL, 'cash', 'en cours', NULL, 8.70925, 36.1782, '2023-01-11 18:03:12', NULL),
	(91, '["aaa*1","vvvvvv*1"]', 240, 1, NULL, 'cash', 'en cours', NULL, 9.5375, 33.8869, '2023-01-11 18:10:13', NULL),
	(92, '["aaa*1","vvvvvv*1"]', 240, 1, NULL, 'cash', 'en cours', NULL, 9.5375, 33.8869, '2023-01-11 18:32:02', NULL),
	(93, '["asus*3"]', 6900, 1, NULL, 'cash', 'en cours', NULL, 9.5375, 33.8869, '2023-01-12 16:44:55', NULL);
/*!40000 ALTER TABLE `commandes` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. contacts
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.contacts : ~0 rows (environ)
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` (`id`, `nom`, `email`, `message`) VALUES
	(1, 'rabie', 'rabiezouita82@gmail.com', 'hello how are you can you help me ? ');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. coupon
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_expiration` varchar(255) NOT NULL,
  `prix` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `etat` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `coupon_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.coupon : ~0 rows (environ)
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` (`id`, `date_expiration`, `prix`, `id_user`, `etat`) VALUES
	(1, '2023-01-13', 383, 1, 'en cours');
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. expererpanier
CREATE TABLE IF NOT EXISTS `expererpanier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_expiration` varchar(255) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `expererpanier_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.expererpanier : ~0 rows (environ)
/*!40000 ALTER TABLE `expererpanier` DISABLE KEYS */;
/*!40000 ALTER TABLE `expererpanier` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. historiques
CREATE TABLE IF NOT EXISTS `historiques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_commande` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_commande` (`id_commande`),
  CONSTRAINT `historiques_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commandes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.historiques : ~0 rows (environ)
/*!40000 ALTER TABLE `historiques` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiques` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. imageproduits
CREATE TABLE IF NOT EXISTS `imageproduits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produit` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `imageproduits_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.imageproduits : ~1 rows (environ)
/*!40000 ALTER TABLE `imageproduits` DISABLE KEYS */;
INSERT INTO `imageproduits` (`id`, `id_produit`, `image`) VALUES
	(3, 3, 'public\\produit\\1673535702189.jpg');
/*!40000 ALTER TABLE `imageproduits` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. likes
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_produit` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produit` (`id_produit`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.likes : ~0 rows (environ)
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. livreurs
CREATE TABLE IF NOT EXISTS `livreurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.livreurs : ~0 rows (environ)
/*!40000 ALTER TABLE `livreurs` DISABLE KEYS */;
/*!40000 ALTER TABLE `livreurs` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. panier
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom_produit` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `prix` int(11) NOT NULL,
  `description` longtext,
  `categorie` varchar(255) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `newprix` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `panier_ibfk_1` (`id_user`),
  KEY `panier_ibfk_2` (`id_produit`),
  CONSTRAINT `panier_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `panier_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.panier : ~0 rows (environ)
/*!40000 ALTER TABLE `panier` DISABLE KEYS */;
/*!40000 ALTER TABLE `panier` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. produits
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `Description` longtext,
  `id_categorie` int(11) DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `promotion` varchar(255) DEFAULT 'false',
  `numberpromotion` int(11) DEFAULT NULL,
  `date_exp` varchar(255) DEFAULT NULL,
  `prixold` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.produits : ~1 rows (environ)
/*!40000 ALTER TABLE `produits` DISABLE KEYS */;
INSERT INTO `produits` (`id`, `nom`, `image`, `prix`, `Description`, `id_categorie`, `quantite`, `created`, `promotion`, `numberpromotion`, `date_exp`, `prixold`) VALUES
	(3, 'asus', 'public\\produit\\1673535702189.jpg', 2300, 'Processeur Intel® Celeron N4020 Dual-Core (1.10 GHz up to 2.80Ghz, 4 MB Cache), Mémoire RAM 4 Go, Disque Dur 128Go SSD eMMC ,  Carte Graphique Intel® UHD 600, Wifi, Bluetooth, HDMI, 1x Type-A USB 3.1 ,1x Type-C USB 3.1 ,1x USB 2.0 , Lecteur de cartes, NumberPad, Clavier Chiclet, Ecran 14" LED HD.', 1, 0, NULL, 'false', NULL, NULL, NULL);
/*!40000 ALTER TABLE `produits` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. quiz
CREATE TABLE IF NOT EXISTS `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre_quiz` varchar(255) NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `bonne_reponse` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.quiz : ~0 rows (environ)
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` (`id`, `titre_quiz`, `option1`, `option2`, `option3`, `bonne_reponse`) VALUES
	(1, 'samsung a32 ', '6', '5', '4', '6');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. rate
CREATE TABLE IF NOT EXISTS `rate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `noter` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_produit` (`id_produit`),
  CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produits` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.rate : ~0 rows (environ)
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. reponse
CREATE TABLE IF NOT EXISTS `reponse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reponse` varchar(255) NOT NULL,
  `id_quiz` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_quiz` (`id_quiz`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `reponse_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `reponse_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.reponse : ~0 rows (environ)
/*!40000 ALTER TABLE `reponse` DISABLE KEYS */;
INSERT INTO `reponse` (`id`, `reponse`, `id_quiz`, `id_user`) VALUES
	(1, '6', 1, 1);
/*!40000 ALTER TABLE `reponse` ENABLE KEYS */;

-- Listage de la structure de la table ecommerce. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `cin` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `banier` varchar(255) DEFAULT 'false',
  `date_supprimer_compte` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Listage des données de la table ecommerce.users : ~3 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `nom`, `prenom`, `mot_de_passe`, `cin`, `role`, `image`, `email`, `banier`, `date_supprimer_compte`, `code`) VALUES
	(1, 'rabie', 'zouita', '$2b$10$YuDif39SIKOek/cLvjd0XO00/Kx5wKccX0weQuf9BLPfgT8BEAe3i', 13633840, 'user', 'public\\client\\1673541324168.jpg', 'rabiezouita82@gmail.com', 'false', '2023-01-22', NULL),
	(2, 'admin', 'aaa', '$2b$10$scxXpLW2imIIIOECC8gfjuc8pkLm4WjXXxwCCclg0L58BKL9xyV3q', 13633840, 'admin', 'public\\client\\1673016439626.jpg', 'admin@admin.com', 'false', NULL, NULL),
	(4, 'hassen ', 'rahali', '$2b$10$WAvu3a1UxcTehrIs5n3VruYYskM7VuDOgU3X7vxDFRWoIDZQ405Pq', 13633840, 'user', 'public\\client\\1673197957096.jpg', 'hassen.rahali@esprit.tn', 'false', NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
