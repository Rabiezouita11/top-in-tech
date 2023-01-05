
module.exports = (sequelize, Sequelize) => {
    const historique = sequelize.define("historique", {
        id_commande: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        

    },
    {
        timestamps: false
    }
    )
    

    return historique;
};