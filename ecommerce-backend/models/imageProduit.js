
module.exports = (sequelize, Sequelize) => {
    const ImageProduit = sequelize.define("ImageProduit", {
    id_produit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'produits',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'  // Foreign key has an 'ON DELETE CASCADE' action
        
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
        

    },
    {
        timestamps: false
    }
    )


    return ImageProduit;
};