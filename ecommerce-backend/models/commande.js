
module.exports = (sequelize, Sequelize) => {
    const commande = sequelize.define("commande", {
        Produit: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true
        },
        total_prix: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Ville: {
            type: Sequelize.STRING,
            allowNull: true
        },

        typedelivraison: {
            type: Sequelize.STRING,
            allowNull: true
        },
        
        etat_commande: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id_livreur: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        lng: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        lat: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        

        created : {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        date_livraison  : {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    }
    )


    return commande;
};