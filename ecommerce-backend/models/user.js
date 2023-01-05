
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mot_de_passe: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cin: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image : {
            type:Sequelize.STRING,
            allowNull: true
        },
        email:{
            type:Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        banier:{
            type:Sequelize.STRING,
            defaultValue: 'false',
        },
        date_supprimer_compte:{
            type:Sequelize.STRING,
            allowNull: true,
        },
        code:{
            type:Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: false
    }
    )


    return User;
};

// write  const all data of user in this file
//
//
//
//
//

// write  const all data of user in this file
//
//
//
//


