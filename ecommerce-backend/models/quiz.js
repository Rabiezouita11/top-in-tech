
module.exports = (sequelize, Sequelize) => {
    const quiz = sequelize.define("quiz", {
        titre_quiz: {
            type: Sequelize.STRING,
            allowNull: false
        },
        option1: {
            type: Sequelize.STRING,
            allowNull: false
        },
        option2: {
            type: Sequelize.STRING,
            allowNull: false
        },
        option3: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bonne_reponse: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
    },
    {
        freezeTableName:true,
        timestamps: false
        
    }
    )

    return quiz;
};