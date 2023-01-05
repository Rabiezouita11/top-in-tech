
module.exports = (sequelize, Sequelize) => {
    const produit = sequelize.define("produit", {
     nom : {
        type: Sequelize.STRING,
        allowNull: true
    },
    image : {
        type: Sequelize.STRING,
        allowNull: true
    },
    prix : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    Description : {
        type: Sequelize.STRING,
        allowNull: true
    },
    id_categorie : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    quantite : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    created : {
        type: Sequelize.DATE,
        allowNull: true
            
    },
    promotion : {
        type: Sequelize.STRING,
        allowNull: true,
         defaultValue: 'false',
    },
    numberpromotion : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    date_exp : {
        type: Sequelize.STRING,
        allowNull: true
    },
    prixold : {
        type: Sequelize.INTEGER,
        allowNull: true
    },


    },
    {
        timestamps: false
    }
    )

    return produit;
};