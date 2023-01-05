
module.exports = (sequelize, Sequelize) => {
    const ImageProduit = sequelize.define("ImageProduit", {
    id_produit: {
        type: Sequelize.INTEGER,
        allowNull: false
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