
module.exports = (sequelize, Sequelize) => {
    const panier = sequelize.define("panier", {
    nom_produit: {      
        type: Sequelize.STRING,
        allowNull: true
    },
    image : {
        type: Sequelize.STRING,
        allowNull: true
    },
    prix : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description : {
        type: Sequelize.STRING,
        allowNull: true
    },
    categorie : {
        type: Sequelize.STRING,
        allowNull: true
    },
    quantite : {    
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_user : { 
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_produit : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    newprix : {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    
     

    },
    
    

    {
        freezeTableName:true,
        timestamps: false
    }
    )

    return panier;
};
// code json ajouter panier 

