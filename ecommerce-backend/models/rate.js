
module.exports = (sequelize, Sequelize) => {
    const rate = sequelize.define("rate", {
     id_user : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_produit : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        noter : {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        
    },
    
    {
        freezeTableName:true,
        timestamps: false
    }
    )

    return rate;
};