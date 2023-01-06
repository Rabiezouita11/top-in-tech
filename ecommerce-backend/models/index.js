const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.js")(sequelize, Sequelize);
db.produit = require("./produit.js")(sequelize, Sequelize);
db.coupon = require("./coupon.js")(sequelize, Sequelize);
db.expererpanier = require("./expererpanier.js")(sequelize, Sequelize);

db.categorie = require("./categorie.js")(sequelize, Sequelize);
db.adresse = require("./adresse.js")(sequelize, Sequelize);
db.avis = require("./avis.js")(sequelize, Sequelize);
db.commande = require("./commande.js")(sequelize, Sequelize);
db.contact = require("./contact.js")(sequelize, Sequelize);

db.historique = require("./historique.js")(sequelize, Sequelize);
db.livreur = require("./livreur.js")(sequelize, Sequelize);
db.panier = require("./panier.js")(sequelize, Sequelize);

db.like = require("./like.js")(sequelize, Sequelize);
db.quiz = require("./quiz.js")(sequelize, Sequelize);
db.rate = require("./rate.js")(sequelize, Sequelize);
db.reponse = require("./reponse.js")(sequelize, Sequelize);
db.imageProduit = require("./imageProduit.js")(sequelize, Sequelize);

// releation entre produit et image produit

db.like.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.like.belongsTo(db.produit, {
  foreignKey: "id_produit",
});

db.imageProduit.belongsTo(db.produit, {
  foreignKey: "id_produit",
});
db.produit.hasMany(db.imageProduit, {
  foreignKey: "id_produit",
});
db.panier.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.expererpanier.belongsTo(db.user, {
  foreignKey: "id_user",
});

db.categorie.hasMany(db.produit, {
  foreignKey: "id_categorie",
});
db.produit.belongsTo(db.categorie, {
  foreignKey: "id_categorie",
});

db.panier.belongsTo(db.produit, {
  foreignKey: "id_produit",
});

db.rate.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.rate.belongsTo(db.produit, {
  foreignKey: "id_produit",
});

db.reponse.belongsTo(db.quiz, {
  foreignKey: "id_quiz",
});
db.reponse.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.historique.belongsTo(db.commande, {
  foreignKey: "id_commande",
});
db.coupon.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.avis.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.adresse.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.commande.belongsTo(db.user, {
  foreignKey: "id_user",
});
db.commande.belongsTo(db.livreur, {
  foreignKey: "id_livreur",
});

module.exports = db;
