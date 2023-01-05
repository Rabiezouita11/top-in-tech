
module.exports = (sequelize, Sequelize) => {
    const like = sequelize.define("like", {
    id_produit: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    },
    {
         timestamps: false
    }
    )


    return like;
};