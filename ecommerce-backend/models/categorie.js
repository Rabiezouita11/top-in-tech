
module.exports = (sequelize, Sequelize) => {
    const categorie = sequelize.define("categorie", {
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        Image   : {
            type: Sequelize.STRING,
            allowNull: true
        },
        
    },
    {
        timestamps: false
    }
    )


    return categorie;
};