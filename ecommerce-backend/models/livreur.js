
module.exports = (sequelize, Sequelize) => {
    const livreur = sequelize.define("livreur", {
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tel: {
            type: Sequelize.STRING,
            allowNull: false
        },
        adresse: {
            type: Sequelize.STRING,
            allowNull: false
        },
     

    },
    {
        timestamps: false
    }
    )


    return livreur;
};