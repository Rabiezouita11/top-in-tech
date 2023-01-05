
module.exports = (sequelize, Sequelize) => {
    const avis = sequelize.define("avis", {
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    }
    )

    return avis;
};