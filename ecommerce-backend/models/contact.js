
module.exports = (sequelize, Sequelize) => {
    const contact = sequelize.define("contact", {
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email : {
            type: Sequelize.STRING,
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

    return contact;
};