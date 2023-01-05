
module.exports = (sequelize, Sequelize) => {
    const coupoun = sequelize.define("coupon", {
        date_expiration: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prix: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        etat : {
            type: Sequelize.STRING,
            allowNull: false
        }, 

    },
    {
        freezeTableName:true,
        timestamps: false
    }
    )

    return coupoun;
};